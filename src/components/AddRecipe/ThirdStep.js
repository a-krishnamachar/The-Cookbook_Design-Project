import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { InstructionCard } from "../Card/InstructionCard";
import {
  BtnNoneOutLine,
  Header,
  TitleAlign,
  GeneralText,
} from "../../styles/styled";

// Destructuring props
const ThirdStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { instructions },
  formErrors,
}) => {
  // Check if all values are not empty or if there are some error
  const isValid = instructions.length > 0;
  const [open, setOpen] = React.useState(false);
  const [instruction, setInstruction] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setInstruction("");
    setOpen(false);
  };

  const handleInstructionChange = (event) => {
    setInstruction(event.target.value);
  };

  const handleClickSubmit = () => {
    instructions.push(instruction);
    handleClose();
  };

  const handleDelete = (index) => {
    instructions.splice(index, 1);
  };

  return (
    <Fragment>
      {instructions.map((instruction, index) => (
        <div onClick={() => handleDelete(index)}>
          <InstructionCard
            instruction={instruction}
            number={index}
            key={`${index}`}
          />
        </div>
      ))}
      <BtnNoneOutLine
        variant="contained"
        color="default"
        style={{ marginTop: 10, marginRight: 10 }}
        onClick={handleClickOpen}
      >
        Add Instruction
      </BtnNoneOutLine>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Instruction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the instruction here:
          </DialogContentText>
          <TextField
            autoFocus
            onChange={handleInstructionChange}
            margin="dense"
            id="instruction"
            label="instruction"
            type="text"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleClickSubmit}
            color="primary"
            disabled={instruction.length == 0}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          display: "flex",
          marginTop: 50,
          marginRight: 50,
          marginBottom: 50,
          justifyContent: "flex-end",
        }}
      >
        <BtnNoneOutLine
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 10 }}
        >
          Back
        </BtnNoneOutLine>
        <BtnNoneOutLine
          variant="contained"
          disabled={!isValid}
          color="primary"
          onClick={isValid ? handleNext : null}
        >
          Next
        </BtnNoneOutLine>
      </div>
    </Fragment>
  );
};

export default ThirdStep;
