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
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import {
  BackBtn,
  DetailedViewPageAlign,
  DetailedViewHeaderAlign,
  CardImage,
  ListAlign,
} from "../../styles/styled";

class Success extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { id, title, ingredients, instructions, image } = this.props.location;
    let fields = {};
    fields["creator"] = this.props.firebase.currentUserId();
    // console.log("debug " + Object.keys(this.props.values.values));
    fields["title"] = title;
    fields["ingredients"] = ingredients;
    fields["instructions"] = instructions;
    fields["image"] = image;
    this.props.firebase.recipes().doc(id).set(fields);
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          return (
            <Box>
              <Typography variant="h2" align="center">
                Succesfully Edited
              </Typography>
            </Box>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Success);
