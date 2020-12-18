import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {
  BtnNoneOutLine,
  Header,
  TitleAlign,
  GeneralText,
} from "../../styles/styled";

// Destructuring props
const FirstStep = ({
  handleNext,
  handleChange,
  values: { title },
  formErrors,
}) => {
  // Check if all values are not empty or if there are some error
  const isValid = title.length > 0;

  return (
    <Fragment>
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

export default FirstStep;
