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
} from "../../styles/styled";
import CardButton from "./CardButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }
  setHover = (didHover) => {
    this.setState({
      hover: didHover,
    });
  };

  saveRecipe = (uid, rid) => {
    this.props.firebase
      .saveRecipe(uid, rid)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  render() {
    const recipe = this.props.recipe;
    console.log(this.props.firebase);
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          const uid = authUser.uid;
          return (
            <div>
              <CardContainer>
                <CardImage
                  src={recipe.image}
                  alt={recipe.title}
                  onMouseEnter={() => this.setHover(true)}
                  onMouseLeave={() => this.setHover(false)}
                />
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
                  onClick={() => this.saveRecipe(uid, recipe.id)}
                  recipeID={recipe.id}
                  price={recipe.price}
                  name={recipe.title}
                  labelName="Save"
                />
              </CardContainer>
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
