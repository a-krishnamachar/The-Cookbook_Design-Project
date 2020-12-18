import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { AddedIngredientCard } from "../Card/AddedIngredientCard";
import { InstructionCard } from "../Card/InstructionCard";
import { ListAlign, BtnNoneOutLine } from "../../styles/styled";

// Destructure props
const Confirm = ({ handleNext, handleBack, values }) => {
  const { title, ingredients, instructions, image } = values;

  const handleSubmit = () => {
    // Do whatever with the values
    console.log(values);
    // Show last compinent or success message
    handleNext();
  };

  return (
    <Fragment>
      <img src={image} />
      <ListAlign>
        <List disablePadding>
          <ListItemText primary="Title" secondary={title} />

          <Divider />

          <ListItemText primary="Ingredient" />
          {ingredients.map((ingredient) => (
            <AddedIngredientCard
              ingredient={ingredient}
              key={`${ingredient.title}`}
            />
          ))}

          <Divider />

          <ListItemText primary="Instructions" />
          {instructions.map((instruction, index) => (
            <InstructionCard
              instruction={instruction}
              number={index}
              key={`${index}`}
            />
          ))}
        </List>
      </ListAlign>
      <div
        style={{
          display: "flex",
          marginBottom: 50,
          justifyContent: "flex-end",
        }}
      >
        <BtnNoneOutLine
          variant="contained"
          color="default"
          onClick={handleBack}
        >
          Back
        </BtnNoneOutLine>
        <BtnNoneOutLine
          style={{ marginLeft: 10 }}
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          Confirm and Continue
        </BtnNoneOutLine>
      </div>
    </Fragment>
  );
};

export default Confirm;
