import React from "react";
import { CookbookCard } from "../Card/CookbookCard";
import { Card } from "../Card/Card";
import AddButton from "./AddButton";
import { Header, CardAlign } from "../../styles/styled";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import SignOut from "../SignOut/SignOut";
import { SearchBoxAlign, PageCardAlign } from "../../styles/styled";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

class MyCookbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      allRecipes: [],
      userMap: {},
      search: null,
    };
  }

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  componentDidMount() {
    const userMap = {};
    const users = this.props.firebase.users();
    users.get().then((querySnapshot) => {
      querySnapshot.forEach((userDoc) => {
        let data = userDoc.data();
        userMap[userDoc.id] = {
          cookbook: data.cookbook,
          email: data.email,
          name: data.name,
          friends: data.friends,
        };
      });
      this.setState({ userMap: userMap });
    });
    const recipeList = [];
    const allRecipes = [];
    const recipes = this.props.firebase.recipes();
    recipes.get().then((querySnapshot) => {
      querySnapshot.forEach((userDoc) => {
        let recipe = {};
        var data = userDoc.data();
        recipe.id = userDoc.id;
        recipe.creatorId = data.creator;
        recipe.creatorName = this.state.userMap[data.creator].name;
        recipe.difficulty = data.difficulty;
        recipe.ingredients = data.ingredients;
        recipe.instructions = data.instructions;
        recipe.time = data.time;
        recipe.title = data.title;
        recipe.image = data.image;
        allRecipes.push(recipe);
        if (data.creator == this.props.firebase.currentUserId()) {
          recipeList.push(recipe);
        }
      });
      this.setState({ recipeList: recipeList, allRecipes: allRecipes });
    });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          let originalStatus = true;
          const allRecipeCards = this.state.allRecipes
            .filter((recipe) => {
              console.log("inidiv recipe", recipe);
              console.log("this.state.search", this.state.search);
              if (this.state.search == null || this.state.search == "") {
                if (recipe.creatorId == this.props.firebase.currentUserId()) {
                  originalStatus = true;
                  return recipe;
                }
              }
              // if nothing is currently in searchbar, return everything
              else if (
                recipe.title
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase()) || //search for dish title
                recipe.creatorName
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase()) //search for dish creator
              ) {
                originalStatus = false;
                return recipe;
              } else {
                // console.log("ingredients", recipe.ingredients)
                for (const ingredient of Object.values(recipe.ingredients)) {
                  if (ingredient != "undefined") {
                    if (
                      ingredient.ingredient.food
                        .toLowerCase()
                        .includes(this.state.search.toLowerCase())
                    ) {
                      //search for dish ingredient
                      originalStatus = false;
                      return recipe;
                    }
                  }
                }
              }
            })
            .map(
              (recipe) =>
                (originalStatus && (
                  <CardAlign>
                    <CookbookCard recipe={recipe} key={`${recipe.id}`} />
                  </CardAlign>
                )) ||
                (!originalStatus && (
                  <CardAlign>
                    <Card recipe={recipe} key={`${recipe.id}`} />
                  </CardAlign>
                ))
            );
          return (
            <div>
              <Header> My Cookbook</Header>
              <SearchBoxAlign>
                <TextField
                  placeholder={"Search your collections..."}
                  onChange={(e) => this.searchSpace(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <AddButton labelName="+" />
              </SearchBoxAlign>
              <PageCardAlign>{allRecipeCards}</PageCardAlign>
              <SignOut />
            </div>
          );
        }}
      </AuthUserContext.Consumer>
      //then call the recipe cards to show up below
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(MyCookbook);
