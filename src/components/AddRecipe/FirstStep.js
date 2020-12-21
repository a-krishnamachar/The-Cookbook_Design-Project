import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import {
  BtnNoneOutLine,
  TitleAlign,
  BottomButtonAlign,
  BottomButtonAlignOneItem
} from "../../styles/styled";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

// Destructuring props
const FirstStep = ({
  handleNext,
  handleChange,
  values: { title },
  formErrors,
}) => {
  // Check if all values are not empty or if there are some error
  const isValid = title.length > 0;
  const [openAlert, setOpenAlert] = React.useState(false);
  // Handle actions
  const handleAlert = () => {
    setOpenAlert(true);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <Fragment>
      <Dialog
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please set the title before continue
          </DialogContentText>
          {/* <Input type="file" onChange={handleFileChange} /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <TitleAlign>
        <TextField
          fullWidth
          label="Title"
          name="title"
          placeholder="What would you like to name your recipe?"
          margin="normal"
          value={title || ""}
          onChange={handleChange}
          required
        />
      </TitleAlign>
      <BottomButtonAlignOneItem>
        <BtnNoneOutLine
          variant="contained"
          color="primary"
          onClick={isValid ? handleNext : handleAlert}
        >
          Next
        </BtnNoneOutLine>
      </BottomButtonAlignOneItem>
    </Fragment>
  );
};

export default FirstStep;
