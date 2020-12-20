import React from "react";
import {
  CookbookCardContainer,
  CookbookCardBody,
  CardTitle,
  CardText,
  CookbookCardImage,
  ColAlign,
  DescriptionAlign,
  CookbookCardIconAlign,
  CookbookCardIcon,
} from "../../styles/styled";
import Delete from "../DeleteRecipe/Delete";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";
import SnackbarAlert from "../SnackbarAlert/SnackbarAlert";

export const CookbookCard = ({
  recipe,
  index,
  isFriendsCookbook,
  creator,
  user,
}) => {
  const [hover, setHover] = React.useState(false);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [deleteWindowOpen, setDeleteWindowOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(-1);
  const url = "https://cookbook.com/recipe/" + index;
  const editPermission = recipe.creatorId === creator;

  const handleOpenSnackBar = () => {
    setSnackBarOpen(true);
  };

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteWindowOpen(false);
  };

  const handleDeleteSubmit = () => {
    console.log("recipe.id " + recipe.id);
    setDeleteId(recipe.id);
    handleDeleteClose();
  };
  return (
    <div>
      <Delete id={deleteId} />
      <SnackbarAlert
        closeSnackbar={handleCloseSnackBar}
        open={snackBarOpen}
        message={"Copied to clickboard"}
      />
      <Dialog
        open={deleteWindowOpen}
        onClose={handleDeleteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Do you want to delete this recipe?
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
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Share your recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy this link to share your recipe
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={url}
            id="sharelink"
            label="sharelink"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
          <Button onClick={handleOpenSnackBar} color="primary">
            Copy
          </Button>
        </DialogActions>
      </Dialog>
      <CookbookCardContainer>
        <CookbookCardBody>
          <CookbookCardImage
            src={recipe.image}
            alt={recipe.title}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
          <ColAlign>
            <Link
              to={{
                pathname: "/detailedRecipeView",
                data: { ...recipe, user: user },
              }}
              style={{ textDecoration: "none" }}
            >
              <CardTitle>{recipe.title}</CardTitle>
            </Link>
            <DescriptionAlign></DescriptionAlign>
            <CookbookCardIconAlign>
              <CookbookCardIcon>
                <ShareIcon onClick={() => setOpen(true)} />
              </CookbookCardIcon>
              <CookbookCardIcon>
                {editPermission && !isFriendsCookbook && (
                  <Link
                    to={{ pathname: "/editpage", data: recipe }}
                    style={{ textDecoration: "none" }}
                  >
                    <EditIcon />
                  </Link>
                )}
              </CookbookCardIcon>
              <CookbookCardIcon>
                {editPermission && !isFriendsCookbook && (
                  <DeleteOutlineIcon
                    onClick={() => setDeleteWindowOpen(true)}
                  />
                )}
              </CookbookCardIcon>
            </CookbookCardIconAlign>
          </ColAlign>
        </CookbookCardBody>
      </CookbookCardContainer>
    </div>
  );
};
