import React from "react";
import { Card } from "../Card/Card";
import { Header, CardAlign } from "../../styles/styled";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from "@material-ui/core/Divider";
import { AddedIngredientCard } from "../Card/AddedIngredientCard";
import { InstructionCard } from "../Card/InstructionCard";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import {
    BackBtn,
    DetailedViewPageAlign,
    DetailedViewHeaderAlign,
    CardImage,
    ListAlign
  } from "../../styles/styled";

class DetailedRecipeView extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   creatorId: this.props.firebase.currentUserId(),
    //   recipeList: [],
    //   userMap: {},
    //   ingredientList: [],
    //   allIngredients: {},
    // };
  }

  render() {
    // let history = useHistory();
    const { data } = this.props.location
    let recipe = data;
    console.log("recipe", recipe);

    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          return (
            // <AddRecipe
            //   allIngredients={this.state.allIngredients}
            //   firebase={this.props.firebase}
            // />
            
            <div>
                <DetailedViewHeaderAlign>
                    <BackBtn onClick={() => {this.props.history.goBack()}}> <ArrowBackIcon /></BackBtn>
                    <h1>{recipe.title}</h1>
                </DetailedViewHeaderAlign>
                <DetailedViewPageAlign>
                    <CardImage src={recipe.image} />
                    
                    <ListAlign>
                        <List disablePadding>

                        <ListItemText primary="Ingredient" />

                        {recipe.ingredients.map((ingredient, index) => (
                            <div>
                            <AddedIngredientCard
                                ingredient={ingredient}
                                key={`${ingredient.title}`}
                            />
                            </div>
                        ))}

                        <Divider />

                        <ListItemText primary="Instructions" />
                        {recipe.instructions.map((instruction, index) => (
                            <div>
                            <InstructionCard
                                instruction={instruction}
                                number={index}
                                key={`${index}`}
                            />
                            </div>
                        ))}
                        </List>
                    </ListAlign>
                </DetailedViewPageAlign>
            </div>

          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(DetailedRecipeView);



//   componentDidMount() {
//     const userMap = {};
//     const users = this.props.firebase.users();
//     users.get().then((querySnapshot) => {
//       querySnapshot.forEach((userDoc) => {
//         let data = userDoc.data();
//         userMap[userDoc.id] = {
//           cookbook: data.cookbook,
//           email: data.email,
//           name: data.name,
//           friends: data.friends,
//         };
//       });
//       this.setState({ userMap: userMap });
//     });

//     const recipeList = [];
//     const recipes = this.props.firebase.recipes();
//     recipes.get().then((querySnapshot) => {
//       querySnapshot.forEach((userDoc) => {
//         let recipe = {};
//         let data = userDoc.data();
//         recipe.id = userDoc.id;
//         recipe.creatorId = data.creator;
//         recipe.creatorName = this.state.userMap[data.creator].name;
//         recipe.difficulty = data.difficulty;
//         recipe.ingredients = data.ingredients;
//         recipe.instructions = data.instructions;
//         recipe.time = data.time;
//         recipe.title = data.title;
//         recipe.image = data.image;
//         recipeList.push(recipe);
//       });
//       this.setState({ recipeList: recipeList });
//     });

//     const allIngredients = {};

//     const ingredientsList = this.props.firebase.ingredients();
//     ingredientsList.get().then((querySnapshot) => {
//       querySnapshot.forEach((userDoc) => {
//         let data = userDoc.data();
//         let ingredientItem = {
//           food: data.title,
//           image: data.image,
//           type: data.type,
//         };
//         allIngredients[data.title] = ingredientItem;
//       });
//       this.setState({ allIngredients: allIngredients });
//     });
//   }

// onClickBackArrow() {
//     this.props.history.goBack()
// }
