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

export const Card = ({ recipe }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div>
      <CardContainer>
        <CardImage
          src={recipe.image}
          alt={recipe.title}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
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
          onClick={() => console.log("clicked")}
          recipeID={recipe.id}
          price={recipe.price}
          name={recipe.title}
          labelName="Save"
        />
      </CardContainer>
    </div>
  );
};
