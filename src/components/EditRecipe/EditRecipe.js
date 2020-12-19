import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { AddedIngredientCard } from "../Card/AddedIngredientCard";
import { InstructionCard } from "../Card/InstructionCard";
import {
  ListAlign,
  CardImage,
  EditIngredientAlign,
  CookbookCardIcon,
  BottomButtonAlign,
  BtnNoneOutLine,
  IngredientBox,
  SearchBoxAlign,
} from "../../styles/styled";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { IngredientCard } from "../Card/IngredientCard";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

// Destructure props
const EditRecipe = ({ values }) => {
  let {
    id,
    defaultTitle,
    defaultIngredients,
    defaultInstructions,
    defaultImage,
    allIngredients,
  } = values;
  const [title, setTitle] = React.useState(defaultTitle);
  const [ingredients, setIngredients] = React.useState(defaultIngredients);
  const [instructions, setInstructions] = React.useState(defaultInstructions);
  const [image, setImage] = React.useState(defaultImage);
  const [titleDialogOpen, setTitleDialogOpen] = React.useState(false);
  const [ingredientDialogOpen, setIngredientDialogOpen] = React.useState(false);
  const [instructionDialogOpen, setInstructionDialogOpen] = React.useState(
    false
  );
  const [ingredientIndex, setIngredientIndex] = React.useState(0);
  const [instructionIndex, setInstructionIndex] = React.useState(0);

  /*
  *************************
    Search function start
  *************************
  */
  const [
    ingredientSearchWindowOpen,
    setIngredientSearchWindowOpen,
  ] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [ingredientItem, setIngredientItem] = React.useState({});
  const [amount, setAmount] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [deleteIndex, setDeleteIndex] = React.useState(-1);
  const [currentIngredients, setIngredient] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleSearchWindowOpen = () => {
    setIngredientSearchWindowOpen(true);
  };

  const handleSearchWindowClose = () => {
    setIngredientSearchWindowOpen(false);
  };

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
    defaultIngredients.push({
      ingredient: ingredientItem,
      amount: amount,
      unit: unit,
    });
    setIngredients(defaultIngredients);
    handleClose();
    setIngredientSearchWindowOpen(false);
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
  /*
  ************************
    Search function end
  ************************
  */

  // Title Modifications
  const handleTitleDialogOpen = () => {
    setTitleDialogOpen(true);
  };

  const handleTitleDialogClose = () => {
    defaultTitle = title;
    setTitleDialogOpen(false);
  };

  const handleTitleChange = (event) => {
    defaultTitle = event.target.value;
    console.log("defaultTitle " + defaultTitle);
  };

  const handleTitleSubmit = () => {
    setTitle(defaultTitle);
    setTitleDialogOpen(false);
  };

  // Ingredient Modifications
  const handleIngredientDialogOpen = (index) => {
    setIngredientIndex(index);
    setIngredientDialogOpen(true);
  };
  const handleIngredientDialogClose = () => {
    defaultIngredients = ingredients;
    setIngredientDialogOpen(false);
  };

  const changeIngredientAmount = (event) => {
    defaultIngredients[ingredientIndex].amount = event.target.value;
  };

  const changeIngredientUnit = (event) => {
    defaultIngredients[ingredientIndex].unit = event.target.value;
  };

  const handleIngredientSubmit = () => {
    setIngredients(defaultIngredients);
    setIngredientDialogOpen(false);
  };

  // Instruction Modifications
  const handleInstructionDialogOpen = (index) => {
    setInstructionIndex(index);
    setInstructionDialogOpen(true);
  };

  const handleInstructionDialogClose = () => {
    defaultInstructions = instructions;
    setInstructionDialogOpen(false);
  };

  const handleInstructionSubmit = () => {
    setInstructions(defaultInstructions);
    setInstructionDialogOpen(false);
  };

  const changeInstruction = (event) => {
    defaultInstructions[instructionIndex] = event.target.value;
  };

  const handleSearch = (event) => {
    const keyword = event.target.value;
    console.log("reach! " + keyword);
    const resultArray = [];
    Object.keys(allIngredients).map(function (key, index) {
      if (
        allIngredients[key].food.toLowerCase().includes(keyword.toLowerCase())
      ) {
        resultArray.push(allIngredients[key]);
      }
    });
    setSearchResults(resultArray);
  };

  return (
    <Fragment>
      <CardImage src={image} />
      {/* -----------Ingredients Add Dialog-------------------- */}
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
      {/* -----------Ingredients Search Dialog-------------------- */}
      <Dialog
        open={ingredientSearchWindowOpen}
        fullScreen={true}
        onClose={handleSearchWindowClose}
      >
        <DialogContent>
          <IngredientBox>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearchWindowClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* -------------------Instructions Dialog------------------ */}
      <Dialog
        open={instructionDialogOpen}
        onClose={handleInstructionDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            fullWidth
            label="Ingredient Title"
            name="ingredienttitle"
            margin="normal"
            defaultValue={instructions[instructionIndex]}
            onChange={changeInstruction}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInstructionDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleInstructionSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* -------------------Ingredient Dialog------------------ */}
      <Dialog
        open={ingredientDialogOpen}
        onClose={handleIngredientDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            margin="normal"
            defaultValue={ingredients[ingredientIndex].amount}
            onChange={changeIngredientAmount}
          />
          <TextField
            fullWidth
            label="Unit"
            name="unit"
            margin="normal"
            defaultValue={ingredients[ingredientIndex].unit}
            onChange={changeIngredientUnit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIngredientDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleIngredientSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* -------------------Title Dialog------------------ */}
      <Dialog
        open={titleDialogOpen}
        onClose={handleTitleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogTitle id="form-dialog-title">Title</DialogTitle>
          <TextField
            fullWidth
            label="Title"
            name="title"
            margin="normal"
            defaultValue={title}
            onChange={handleTitleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTitleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTitleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ListAlign>
        <List disablePadding>
          {/* -------------------Title------------------ */}
          <ListItemText
            primary="Title"
            secondary={title}
            onClick={handleTitleDialogOpen}
          />

          <Divider />
          {/* -------------------Ingredient------------------ */}
          <ListItemText primary="Ingredient" />
          <EditIngredientAlign>
            <CookbookCardIcon>
              <EditIcon onClick={handleSearchWindowOpen} />
            </CookbookCardIcon>
          </EditIngredientAlign>
          {ingredients.map((ingredient, index) => (
            <div
              onClick={() => handleIngredientDialogOpen(index)}
              key={`${index}`}
            >
              <AddedIngredientCard
                ingredient={ingredient}
                key={`${ingredient.title}`}
                isCreatingRecipe={false}
              />
            </div>
          ))}

          <Divider />
          {/* -------------------Instructions------------------ */}
          <ListItemText primary="Instructions" />
          <EditIngredientAlign>
            <CookbookCardIcon>
              <EditIcon />
            </CookbookCardIcon>
          </EditIngredientAlign>
          {instructions.map((instruction, index) => (
            <div
              onClick={() => handleInstructionDialogOpen(index)}
              key={`${index}`}
            >
              <InstructionCard
                instruction={instruction}
                number={index}
                key={`${index}`}
                isCreatingRecipe={false}
              />
            </div>
          ))}
        </List>
      </ListAlign>
      <BottomButtonAlign>
        <Link
          to={{
            pathname: "/success",
            id: id,
            title: defaultTitle,
            ingredients: defaultIngredients,
            instructions: defaultInstructions,
            image: defaultImage,
          }}
          style={{ textDecoration: "none" }}
        >
          <BtnNoneOutLine
            style={{ marginLeft: 10 }}
            variant="contained"
            color="secondary"
          >
            Confirm and Continue
          </BtnNoneOutLine>
        </Link>
      </BottomButtonAlign>
    </Fragment>
  );
};

export default EditRecipe;
