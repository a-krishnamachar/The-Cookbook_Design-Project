import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./snackbar.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SnackbarAlert extends React.Component {
  render() {
    const { open, closeSnackbar } = this.props;
    return (
      <Snackbar
        className="margin-adjustment"
        open={open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="success">
          {this.props.message}
        </Alert>
      </Snackbar>
    );
  }
}

export default SnackbarAlert;
