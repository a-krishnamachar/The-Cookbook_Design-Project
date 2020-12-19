import React from "react";
import { Card } from "../Card/Card";
import { Header, CardAlign } from "../../styles/styled";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import EditRecipe from "./EditRecipe";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Divider from "@material-ui/core/Divider";
import { AddedIngredientCard } from "../Card/AddedIngredientCard";
import { InstructionCard } from "../Card/InstructionCard";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

import {
  BackBtn,
  DetailedViewPageAlign,
  DetailedViewHeaderAlign,
  CardImage,
  ListAlign,
} from "../../styles/styled";

class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creatorId: this.props.firebase.currentUserId(),
      recipeList: [],
      userMap: {},
      ingredientList: [],
      allIngredients: {},
    };
  }

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
    const recipes = this.props.firebase.recipes();
    recipes.get().then((querySnapshot) => {
      querySnapshot.forEach((userDoc) => {
        let recipe = {};
        let data = userDoc.data();
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

    const allIngredients = {};

    const ingredientsList = this.props.firebase.ingredients();
    ingredientsList.get().then((querySnapshot) => {
      querySnapshot.forEach((userDoc) => {
        let data = userDoc.data();
        let ingredientItem = {
          food: data.title,
          image: data.image,
          type: data.type,
        };
        allIngredients[data.title] = ingredientItem;
      });
      this.setState({ allIngredients: allIngredients });
    });
  }
  render() {
    let { data, search } = this.props.location;
    let recipe = data;
    search = search.substring(1);
    let user = [];
    const values = {
      id: recipe.id,
      defaultTitle: recipe.title,
      defaultIngredients: recipe.ingredients,
      defaultInstructions: recipe.instructions,
      defaultImage: recipe.image,
      allIngredients: this.state.allIngredients,
    };
    if (typeof recipe != "undefined") {
      user = recipe.user;
    }

    const BackButton = () => {
      if (search != "") {
        return (
          <Link
            to={{ pathname: "/search", search: search }}
            style={{ textDecoration: "none" }}
          >
            <BackBtn>
              {" "}
              <ArrowBackIcon />
            </BackBtn>
          </Link>
        );
      } else {
        if (typeof user != "undefined") {
          return (
            <Link
              to={{ pathname: "/friendsCookbook", data: user }}
              style={{ textDecoration: "none" }}
            >
              <BackBtn>
                {" "}
                <ArrowBackIcon />
              </BackBtn>
            </Link>
          );
        } else {
          return (
            <BackBtn
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              {" "}
              <ArrowBackIcon />
            </BackBtn>
          );
        }
      }
    };

    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          return (
            <div>
              {" "}
              <DetailedViewHeaderAlign>
                <BackButton />
              </DetailedViewHeaderAlign>
              <EditRecipe values={values} />
            </div>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(EditPage);
