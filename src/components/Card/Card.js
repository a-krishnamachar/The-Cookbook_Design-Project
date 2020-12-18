import React from "react";
import {
  CardContainer,
  CardBody,
  CardTitle,
  CardText,
  CardAuthorText,
  CardImage,
  RowAlign,
  DescriptionAlign,
  UserAlign,
  UserIconAlign,
  GoToDetailedRecipeView
} from "../../styles/styled";
import CardButton from "./CardButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
<<<<<<< HEAD
import SnackbarAlert from "../SnackbarAlert/SnackbarAlert";
=======
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
>>>>>>> b7556f2486c85ec25f1173bf24c727d53104847b

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      open: false,
      snackbarMessage: "",
      saved: false,
    };
  }
  setHover = (didHover) => {
    this.setState({
      hover: didHover,
    });
  };

  handleClick = (message) =>
    this.setState({ open: true, snackbarMessage: message });
  handleClose = (event, reason) =>
    reason === "clickaway" ? null : this.setState({ open: false });

  saveRecipe = (uid, rid) => {
    this.props.firebase
      .saveRecipe(uid, rid)
      .then(() => this.handleClick("Recipe successfully saved"))
      .catch((err) => console.log(err));
  };

  render() {
    const recipe = this.props.recipe;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          const uid = authUser.uid;
          return (
            <div>
              <CardContainer>
                <GoToDetailedRecipeView>
                  <ArrowForwardIcon style={{ color: "black", fontSize: "7em" }} />
                </GoToDetailedRecipeView>
                <Link to="/detailedRecipeView" style={{ textDecoration: "none" }}>
                  <CardImage
                    src={recipe.image}
                    alt={recipe.title}
                    onMouseEnter={() => this.setHover(true)}
                    onMouseLeave={() => this.setHover(false)}
                  />
                </Link>
                <CardBody>
                  {/* <RowAlign>
            
            <CardText>{foodItem.description}</CardText>
          </RowAlign> */}
                  <RowAlign>
                    <CardTitle>{recipe.title}</CardTitle>
                    <DescriptionAlign>
                      <UserAlign>
                        <UserIconAlign>
                          <AccountCircle />
                        </UserIconAlign>
                        <CardAuthorText>{recipe.creatorName}</CardAuthorText>
                      </UserAlign>
                      <CardText>{recipe.time}</CardText>
                      <CardText>{recipe.difficulty}</CardText>
                    </DescriptionAlign>
                  </RowAlign>
                </CardBody>
                <CardButton
                  disabled={true}
                  onClick={() => this.saveRecipe(uid, recipe.id)}
                  recipeID={recipe.id}
                  price={recipe.price}
                  name={recipe.title}
                  labelName={this.state.saved ? "Saved" : "Save"}
                />
              </CardContainer>
              <SnackbarAlert
                closeSnackbar={this.handleClose}
                open={this.state.open}
                message={this.state.snackbarMessage}
              />
            </div>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Card);

// export const Card = ({ recipe }) => {
//   const [hover, setHover] = React.useState(false);
//   return (
//     <div>
//       <CardContainer>
//         <CardImage
//           src={recipe.image}
//           alt={recipe.title}
//           onMouseEnter={() => setHover(true)}
//           onMouseLeave={() => setHover(false)}
//         />
//         <CardBody>
//           {/* <RowAlign>

//             <CardText>{foodItem.description}</CardText>
//           </RowAlign> */}
//           <RowAlign>
//             <CardTitle>{recipe.title}</CardTitle>
//             <DescriptionAlign>
//               <UserAlign>
//                 <UserIconAlign>
//                   <AccountCircle />
//                 </UserIconAlign>
//                 <CardAuthorText>{recipe.creatorName}</CardAuthorText>
//               </UserAlign>
//               <CardText>{recipe.time}</CardText>
//               <CardText>{recipe.difficulty}</CardText>
//             </DescriptionAlign>
//           </RowAlign>
//         </CardBody>
//         <CardButton
//           onClick={() => console.log("clicked")}
//           recipeID={recipe.id}
//           price={recipe.price}
//           name={recipe.title}
//           labelName="Save"
//         />
//       </CardContainer>
//     </div>
//   );
// };
