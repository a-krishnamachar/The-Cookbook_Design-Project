import React from "react";
import { SaveButton } from "../../styles/styled";
const CardButton = ({ foodID, price, name, labelName, onClick }) => {
  return (
    <div>
      <SaveButton onClick={onClick}>{labelName}</SaveButton>
    </div>
  );
};

export default CardButton;
