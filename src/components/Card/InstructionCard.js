import React from "react";
import {
  IngredientRowAlign,
  InstructionColAlign,
  DeleteAlign,
  IngredientCardAlign,
} from "../../styles/styled";
import CardButton from "./CardButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
            <DeleteOutlinedIcon />
          </DeleteAlign>
        </IngredientRowAlign>
      </IngredientCardAlign>
    </div>
  );
};
