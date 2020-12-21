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
import { BtnNoneOutLine, BottomButtonAlign,AlignAddInstructionBtn } from "../../styles/styled";

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
  const [openAlert, setOpenAlert] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [instruction, setInstruction] = React.useState("");
  const [deleteIndex, setDeleteIndex] = React.useState(-1);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const handleAlert = () => {
    setOpenAlert(true);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
  };

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

  const handleDeleteSubmit = () => {
    instructions.splice(deleteIndex, 1);
    setInstruction(instructions);
    handleDeleteClose();
  };

  const handleOpenDelete = (index) => {
    setDeleteIndex(index);
    setConfirmDelete(true);
  };

  const handleDeleteClose = () => {
    setConfirmDelete(false);
  };

  return (
    <Fragment>
      <BottomButtonAlign>
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
          color="primary"
          onClick={isValid ? handleNext : handleAlert}
        >
          Next
        </BtnNoneOutLine>
      </BottomButtonAlign>
      {instructions.map((instruction, index) => (
        <div onClick={() => handleOpenDelete(index)} key={`${index}`}>
          <InstructionCard
            instruction={instruction}
            number={index}
            key={`${index}`}
          />
        </div>
      ))}
      <AlignAddInstructionBtn>
      <BtnNoneOutLine
        variant="contained"
        color="default"
        style={{ marginTop: 10, marginRight: 10 }}
        onClick={handleClickOpen}
      >
        Add Instruction
      </BtnNoneOutLine>
      </AlignAddInstructionBtn>
      <Dialog
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload at least one instruction before continue:
          </DialogContentText>
          {/* <Input type="file" onChange={handleFileChange} /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
            multiline
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
    </Fragment>
  );
};

export default ThirdStep;
