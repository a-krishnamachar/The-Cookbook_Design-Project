import React from "react";
import {
  IngredientRowAlign,
  IngredientColAlign,
  IngredientColAlignForTitle,
  IngredientCardAlign,
  DeleteAlign,
} from "../../styles/styled";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CardButton from "./CardButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const AddedIngredientCard = ({ ingredient }) => {
  return (
    <div>
      <IngredientCardAlign>
        <IngredientRowAlign>
          <IngredientColAlign>{ingredient.amount}</IngredientColAlign>
          <IngredientColAlign>{ingredient.unit}</IngredientColAlign>
          <IngredientColAlignForTitle>
            {ingredient.title}
          </IngredientColAlignForTitle>
          <DeleteAlign>
            <DeleteOutlinedIcon />
          </DeleteAlign>
        </IngredientRowAlign>
      </IngredientCardAlign>
    </div>
  );
};
