import React from "react";
import {
  IngredientRowAlign,
  IngredientColAlign,
  IngredientColAlignForTitle,
  IngredientCardAlign,
  DeleteAlign,
  DeleteIconAlign,
  IngredientRowText
} from "../../styles/styled";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

export const AddedIngredientCard = ({ ingredient, isCreatingRecipe }) => {

  const PossibleDeleteIcon = () => {
    if (isCreatingRecipe) {
      return (
      <DeleteOutlinedIcon />
      );
    }
    else {
      return null;
    }
    
  }

  return (
    <div>
      <IngredientCardAlign>
        <IngredientRowAlign>
          <IngredientRowText>{ingredient.amount}</IngredientRowText>
          <IngredientRowText>{ingredient.unit}</IngredientRowText>
          <IngredientRowText>{ingredient.ingredient.food}</IngredientRowText>
          <DeleteAlign>
            <DeleteIconAlign>
              <PossibleDeleteIcon />
            </DeleteIconAlign>
          </DeleteAlign>
        </IngredientRowAlign>
      </IngredientCardAlign>
    </div>
  );
};
