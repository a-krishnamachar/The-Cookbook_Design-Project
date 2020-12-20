import React from "react";
import { CookbookCard } from "../Card/CookbookCard";
import Card from "../Card/Card";
import AddButton from "./AddButton";
import { Header, CardAlign, DeleteIconAlign } from "../../styles/styled";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

import {
  SearchBoxAlign,
  PageCardAlign,
  BottomButtonAlign,
} from "../../styles/styled";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

class MyCookbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      allRecipes: [],
      myRecipeIds: [],
      userMap: {},
      search: null,
      shareWindowOpen: false,
    };
  }

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  componentDidMount() {
    const myid = this.props.firebase.currentUserId();
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

    this.props.firebase
      .user(myid)
      .get()
      .then((data) => {
        this.setState({
          myRecipeIds: data.data().cookbook,
        });
        return data.data().cookbook;
      })
      .then((mycb) => {
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
            if (data.creator == myid || mycb.includes(userDoc.id)) {
              recipeList.push(recipe);
            }
          });
          this.setState({ recipeList: recipeList, allRecipes: allRecipes });
        });
      });
  }

  render() {
    let currentUserName = "";
    for (const id in this.state.userMap) {
      if (id == this.props.firebase.currentUserId()) {
        currentUserName = this.state.userMap[id].name;
      }
    }

    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          let originalStatus = true;
          const allRecipeCards = this.state.allRecipes
            .filter((recipe) => {
              if (this.state.search == null || this.state.search == "") {
                if (
                  recipe.creatorId == this.props.firebase.currentUserId() ||
                  this.state.myRecipeIds.includes(recipe.id)
                ) {
                  originalStatus = true;
                  return recipe;
                }
              }
              // if nothing is currently in searchbar, return everything
              else if (
                recipe.creatorId == this.props.firebase.currentUserId()
              ) {
                if (
                  recipe.title
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
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
              }
            })
            .map(
              (recipe, index) =>
                (originalStatus && (
                  <CardAlign key={`${recipe.id}`}>
                    <CookbookCard
                      recipe={recipe}
                      key={`${recipe.id}`}
                      index={index}
                      creator={this.props.firebase.currentUserId()}
                    />
                  </CardAlign>
                )) ||
                (!originalStatus && (
                  <CardAlign key={`${recipe.id}`}>
                    <Card recipe={recipe} key={`${recipe.id}`} />
                  </CardAlign>
                ))
            );

          return (
            <div>
              <Header> {currentUserName}'s Cookbook</Header>
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
                <Link to="/addpage" style={{ textDecoration: "none" }}>
                  <DeleteIconAlign>
                    <AddButton labelName="+" />
                  </DeleteIconAlign>
                </Link>
              </SearchBoxAlign>
              <PageCardAlign>{allRecipeCards}</PageCardAlign>
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
