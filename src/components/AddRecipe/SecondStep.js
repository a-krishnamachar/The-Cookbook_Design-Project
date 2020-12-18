import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { IngredientCard } from "../Card/IngredientCard";
import { AddedIngredientCard } from "../Card/AddedIngredientCard";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {
  BtnNoneOutLine,
  IngredientBox,
  IngredientAlign,
  IngredientContainer,
  SearchBoxAlign,
  PageCardAlign,
} from "../../styles/styled";
import { AcUnit } from "@material-ui/icons";

// Destructuring props
const SecondStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { ingredients },
  allIngredients,
  formErrors,
}) => {
  // Check if all values are not empty or if there are some error
  const isValid = ingredients.length > 0;
  const [searchResults, setSearchResults] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [currentIngredients, setIngredient] = React.useState([]);
  // Handle actions

  const handleClickOpen = (title) => {
    setTitle(title);
    setOpen(true);
  };

  const handleClose = () => {
    setTitle("");
    setAmount("");
    setUnit("");
    setOpen(false);
  };

  const handleClickSubmit = () => {
    ingredients.push({
      title: title,
      amount: amount,
      unit: unit,
    });
    setIngredient(ingredients);
    handleClose();
  };

  const handleDelete = (index) => {
    console.log("Reach");
    ingredients.splice(index, 1);
    setIngredient(ingredients);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };
  const handleSearch = (event) => {
    const keyword = event.target.value;
    const resultArray = [];
    Object.keys(allIngredients.allIngredients).map(function (key, index) {
      if (
        allIngredients.allIngredients[key].title
          .toLowerCase()
          .startsWith(keyword.toLowerCase())
      ) {
        resultArray.push(allIngredients.allIngredients[key]);
      }
    });
    setSearchResults(resultArray);
  };

  return (
    <>
      <IngredientBox>
        {currentIngredients.map((ingredient, index) => (
          <div onClick={() => handleDelete(index)} key={`${index}`}>
            <AddedIngredientCard ingredient={ingredient} key={`${index}`} />
          </div>
        ))}

        <SearchBoxAlign>
          <TextField
            placeholder={"Search your collections..."}
            onChange={(e) => handleSearch(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </SearchBoxAlign>
      </IngredientBox>
      <IngredientBox>
        {searchResults.map((ingredient) => (
          <div
            onClick={() => handleClickOpen(ingredient.title)}
            key={`${ingredient.title}`}
          >
            <IngredientCard
              ingredient={ingredient}
              key={`${ingredient.title}`}
            />
          </div>
        ))}
      </IngredientBox>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Ingredient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the amount you want here:
          </DialogContentText>
          <TextField
            autoFocus
            onChange={handleAmountChange}
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            required
          />
          <DialogContentText>Please enter the unit here:</DialogContentText>
          <TextField
            autoFocus
            onChange={handleUnitChange}
            margin="dense"
            id="unit"
            label="Unit"
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
            onClick={() => handleClickSubmit()}
            color="primary"
            disabled={amount.length == 0 || unit.length == 0}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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
    </>
  );
};
const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(SecondStep);
