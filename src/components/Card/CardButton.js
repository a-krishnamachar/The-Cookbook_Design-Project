import React from "react";
import { SaveButton } from "../../styles/styled";
const CardButton = ({ foodID, price, name, labelName }) => {
  return (
    <div>
      <SaveButton>{labelName}</SaveButton>
    </div>
  );
};

export default CardButton;
