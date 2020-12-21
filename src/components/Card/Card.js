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
  GoToDetailedRecipeView,
  SaveButton,
} from "../../styles/styled";
import CardButton from "./CardButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import SnackbarAlert from "../SnackbarAlert/SnackbarAlert";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

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
    this.setState({
      saved: true
    })
    this.render();
  };

  componentDidMount() {
    const myid = this.props.firebase.currentUserId();
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
        if (this.props.recipe.creator == myid || mycb.includes(this.props.recipe.id)) {
          this.setState({
            saved: true,
          })
        }
      });
  }

  render() {
    const recipe = this.props.recipe;
    const search = this.props.search;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          const uid = authUser.uid;
          return (
            <div>
              <CardContainer>
                <GoToDetailedRecipeView>
                  <ArrowForwardIcon
                    style={{ color: "black", fontSize: "7em" }}
                  />
                </GoToDetailedRecipeView>
                <Link
                  to={{pathname: "/detailedRecipeView", data: recipe, search: search}}
                  style={{ textDecoration: "none" }}
                >
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
                    </DescriptionAlign>
                  </RowAlign>
                </CardBody>
                <SaveButton
                  onClick={() => this.saveRecipe(uid, recipe.id)}
                  style={{background: this.state.saved ? "#f55f5f" : "white"}}
                >{this.state.saved ? "Saved" : "Save"}</SaveButton>
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
