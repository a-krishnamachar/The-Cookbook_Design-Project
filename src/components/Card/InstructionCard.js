import React from "react";
import {
  IngredientRowAlign,
  InstructionColAlign,
  DeleteAlign,
  IngredientCardAlign,
  DeleteIconAlign,
} from "../../styles/styled";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

export const InstructionCard = ({ instruction, number, isCreatingRecipe }) => {
  number++;

  const PossibleDeleteIcon = () => {
    if (isCreatingRecipe) {
      return (<DeleteOutlinedIcon />);
    }
    else {
      return null;
    }
    
  }

  return (
    <div>
      <IngredientCardAlign>
        <IngredientRowAlign>
          <InstructionColAlign>
            {number}.{instruction}
          </InstructionColAlign>
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
