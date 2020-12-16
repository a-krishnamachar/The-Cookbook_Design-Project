import React from "react";
import { CookbookCard } from "../Card/CookbookCard";
import { Header, CardAlign } from "../../styles/styled";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import SignOut from "../SignOut/SignOut";
import { AddBtn } from "../../styles/styled";
import { IconAlign } from "../../styles/styled";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

class MyCookbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      userMap: {},
    };
  }
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
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
          const recipes = this.props.firebase.recipes();
          recipes.get().then((querySnapshot) => {
            querySnapshot.forEach((userDoc) => {
              let recipe = {};
              var data = userDoc.data();
              if (data.creator == this.props.firebase.currentUserId()) {
                recipe.id = userDoc.id;
                recipe.creatorId = data.creator;
                recipe.creatorName = this.state.userMap[data.creator].name;
                recipe.difficulty = data.difficulty;
                recipe.ingredients = data.ingredients;
                recipe.instructions = data.instructions;
                recipe.time = data.time;
                recipe.title = data.title;
                recipe.image = data.image;
                recipeList.push(recipe);
              }
            });
            this.setState({ recipeList: recipeList });
          });

          return (
            <div>
              <Header>
                {" "}
                My Cookbook <SignOut />
              </Header>
              <div>
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
                <AddBtn>
                  <button>+</button>
                </AddBtn>
              </div>
              <CardAlign>
                {this.state.recipeList.map((recipe) => (
                  <CookbookCard recipe={recipe} key={`${recipe.id}`} />
                ))}
              </CardAlign>
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
