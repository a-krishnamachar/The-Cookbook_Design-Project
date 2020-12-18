import React from "react";
import {
  IngredientContainer,
  IngredientBody,
  CardTitle,
  IngredientText,
  IngredientHover,
  IngredientImage,
  RowAlign,
  DescriptionAlign,
  UserAlign,
  UserIconAlign,
} from "../../styles/styled";
import CardButton from "./CardButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const IngredientCard = ({ ingredient }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div>
      <IngredientContainer
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <IngredientImage src={ingredient.image} alt={ingredient.title} />
        {hover && <IngredientHover>ADD</IngredientHover>}
        <IngredientBody>
          <CardTitle>{ingredient.title}</CardTitle>
          <IngredientText>{ingredient.type}</IngredientText>
        </IngredientBody>
      </IngredientContainer>
    </div>
  );
};
