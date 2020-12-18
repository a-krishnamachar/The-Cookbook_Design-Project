import React from "react";
import {
  IngredientRowAlign,
  InstructionColAlign,
  DeleteAlign,
  IngredientCardAlign,
  DeleteIconAlign,
} from "../../styles/styled";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

export const InstructionCard = ({ instruction, number }) => {
  number++;
  return (
    <div>
      <IngredientCardAlign>
        <IngredientRowAlign>
          <InstructionColAlign>
            {number}.{instruction}
          </InstructionColAlign>
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
