import React from "react";
import {
  IngredientRowAlign,
  IngredientColAlign,
  IngredientColAlignForTitle,
  IngredientCardAlign,
  DeleteAlign,
  DeleteIconAlign,
} from "../../styles/styled";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

export const AddedIngredientCard = ({ ingredient }) => {
  return (
    <div>
      <IngredientCardAlign>
        <IngredientRowAlign>
          <IngredientColAlign>{ingredient.amount}</IngredientColAlign>
          <IngredientColAlign>{ingredient.unit}</IngredientColAlign>
          <IngredientColAlignForTitle>
            {ingredient.ingredient.food}
          </IngredientColAlignForTitle>
          <DeleteAlign>
            <DeleteIconAlign>
              <DeleteOutlinedIcon />
            </DeleteIconAlign>
          </DeleteAlign>
        </IngredientRowAlign>
      </IngredientCardAlign>
    </div>
  );
};
