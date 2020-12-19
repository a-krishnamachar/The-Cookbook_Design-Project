import React from "react";
import { Card } from "../Card/Card";
import { Header, CardAlign } from "../../styles/styled";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
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

class DetailedRecipeView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data, search } = this.props.location;
    let recipe = data;
    console.log("recipe", recipe);
    console.log("search 1", search.substring(1));
    search = search.substring(1);
    let user = [];
    if (typeof recipe != "undefined") {
      user = recipe.user;
    }
    console.log("USERRR", user);

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
              <DetailedViewHeaderAlign>
                <BackButton />
                <h1>{recipe.title}</h1>
              </DetailedViewHeaderAlign>

              <DetailedViewPageAlign>
                <CardImage src={recipe.image} />

                <ListAlign>
                  <List disablePadding>
                    <ListItemText primary="Ingredient" />

                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={`${index}`}>
                        <AddedIngredientCard
                          ingredient={ingredient}
                          key={`${ingredient.title}`}
                          isCreatingRecipe={false}
                        />
                      </div>
                    ))}

                    <Divider />

                    <ListItemText primary="Instructions" />
                    {recipe.instructions.map((instruction, index) => (
                      <div key={`${index}`}>
                        <InstructionCard
                          instruction={instruction}
                          number={index}
                          key={`${index}`}
                          isCreatingRecipe={false}
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

export default compose(
  withFirebase,
  withAuthorization(condition)
)(DetailedRecipeView);
