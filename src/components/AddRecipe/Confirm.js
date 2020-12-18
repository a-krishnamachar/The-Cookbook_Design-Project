import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { AddedIngredientCard } from "../Card/AddedIngredientCard";
import { InstructionCard } from "../Card/InstructionCard";
import {
  ListAlign,
  BtnNoneOutLine,
  CardImage,
  BottomButtonAlign,
} from "../../styles/styled";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

// Destructure props
const Confirm = ({ handleNext, handleBack, values }) => {
  const { title, ingredients, instructions, image } = values;
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [deleteIndex, setDeleteIndex] = React.useState(-1);

  const handleSubmit = () => {
    // Do whatever with the values
    console.log(values);
    // Show last compinent or success message
    handleNext();
  };

  const handleOpenDelete = (index, result) => {
    setDeleteIndex(index);
    setResult(result);
    setConfirmDelete(true);
  };

  const handleDeleteClose = () => {
    setConfirmDelete(false);
  };

  const handleDeleteSubmit = () => {
    result.splice(deleteIndex, 1);
    handleDeleteClose();
  };

  return (
    <Fragment>
      <CardImage src={image} />
      <Dialog
        open={confirmDelete}
        onClose={handleDeleteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Do you want to delete this record?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ListAlign>
        <List disablePadding>
          <ListItemText primary="Title" secondary={title} />

          <Divider />

          <ListItemText primary="Ingredient" />

          {ingredients.map((ingredient, index) => (
            <div
              onClick={() => handleOpenDelete(index, ingredients)}
              key={`${index}`}
            >
              <AddedIngredientCard
                ingredient={ingredient}
                key={`${ingredient.title}`}
              />
            </div>
          ))}

          <Divider />

          <ListItemText primary="Instructions" />
          {instructions.map((instruction, index) => (
            <div
              onClick={() => handleOpenDelete(index, instructions)}
              key={`${index}`}
            >
              <InstructionCard
                instruction={instruction}
                number={index}
                key={`${index}`}
              />
            </div>
          ))}
        </List>
      </ListAlign>
      <BottomButtonAlign>
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
      </BottomButtonAlign>
    </Fragment>
  );
};

export default Confirm;
