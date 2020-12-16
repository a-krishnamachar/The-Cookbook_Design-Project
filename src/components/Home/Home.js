import React from "react";
import { Card } from "../Card/Card";
import { Header, CardAlign } from "../../styles/styled";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

class Home extends React.Component {
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
            });
            this.setState({ recipeList: recipeList });
          });

          return (
            <div>
              <Header> Home </Header>
              <CardAlign>
                {this.state.recipeList.map((recipe) => (
                  <Card recipe={recipe} key={`${recipe.id}`} />
                ))}
              </CardAlign>
            </div>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Home);
