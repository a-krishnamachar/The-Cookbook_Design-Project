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
  SearchBoxAlign,
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
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [ingredientItem, setIngredientItem] = React.useState({});
  const [amount, setAmount] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [deleteIndex, setDeleteIndex] = React.useState(-1);
  const [currentIngredients, setIngredient] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  // Handle actions
  const handleAlert = () => {
    setOpenAlert(true);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleClickOpen = (ingredient) => {
    setIngredientItem(ingredient);
    setOpen(true);
  };

  const handleClose = () => {
    setIngredientItem({});
    setAmount("");
    setUnit("");
    setOpen(false);
  };

  const handleClickSubmit = () => {
    ingredients.push({
      ingredient: ingredientItem,
      amount: amount,
      unit: unit,
    });
    setIngredient(ingredients);
    handleClose();
  };

  const handleDeleteSubmit = () => {
    ingredients.splice(deleteIndex, 1);
    setIngredient(ingredients);
    handleDeleteClose();
  };

  const handleOpenDelete = (index) => {
    setDeleteIndex(index);
    setConfirmDelete(true);
  };

  const handleDeleteClose = () => {
    setConfirmDelete(false);
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
      console.log("key " + key);
      if (
        allIngredients.allIngredients[key].food
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
          <div onClick={() => handleOpenDelete(index)} key={`${index}`}>
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
            onClick={() => handleClickOpen(ingredient)}
            key={`${ingredient.food}`}
          >
            <IngredientCard
              ingredient={ingredient}
              key={`${ingredient.food}`}
            />
          </div>
        ))}
      </IngredientBox>
      <Dialog
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload at least one ingredient before continue:
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
          color="primary"
          onClick={isValid ? handleNext : handleAlert}
        >
          Next
        </BtnNoneOutLine>
      </div>
    </>
  );
};
const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(SecondStep);
