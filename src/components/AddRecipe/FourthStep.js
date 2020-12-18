import React, { Fragment } from "react";
import Input from "@material-ui/core/Input";
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
  CardImage,
  TitleAlign,
  GeneralText,
} from "../../styles/styled";

const FourthStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { image },
  formErrors,
  firebase,
}) => {
  // Check if all values are not empty or if there are some error
  const [open, setOpen] = React.useState(false);
  const [currentFile, setFile] = React.useState(null);
  const handleUpload = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //   const handleFileSubmit = async () => {
  //     const storageRef = firebase.storage.ref();
  //     const fileRef = storageRef.child(file.name);
  //     await fileRef.put(file);
  //     image = await fileRef.getDownloadURL();
  //     handleClose();
  //   };

  const handleFileSubmit = () => {
    image = currentFile;
    console.log("image " + image);
    handleClose();
  };

  const handleFileChange = (event) => {
    const tempFile = event.target.files[0];
    setFile(tempFile);
  };

  const handleFileURLChange = (event) => {
    setFile(event.target.value);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
        <DialogContent>
          <DialogContentText>Please upload the image here:</DialogContentText>
          <Input type="file" onChange={handleFileChange} />
          <TextField
            autoFocus
            onChange={handleFileURLChange}
            margin="dense"
            id="url"
            label="url"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFileSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <BtnNoneOutLine
        variant="contained"
        color="default"
        onClick={handleUpload}
      >
        Upload Image
      </BtnNoneOutLine>
      <img src={currentFile} alt="" />
      <div
        style={{
          display: "flex",
          marginTop: 50,
          marginRight: 50,
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
          color="primary"
          onClick={handleNext}
        >
          Next
        </BtnNoneOutLine>
      </div>
    </Fragment>
  );
};

export default FourthStep;
