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

export const CookbookCard = ({ recipe, index }) => {
  const [hover, setHover] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const url = "https://cookbook.com/recipe/" + index;
  return (
    <div>
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
            Cancel
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
            <CardTitle>{recipe.title}</CardTitle>
            <DescriptionAlign>
              {/* <CardText>{"56 people viewed"}</CardText> */}
              {/* <CardText>{"9 people used your recipe"}</CardText> */}
            </DescriptionAlign>
            <CookbookCardIconAlign>
              <CookbookCardIcon>
                <ShareIcon onClick={() => setOpen(true)} />
              </CookbookCardIcon>
              <CookbookCardIcon>
                <EditIcon />
              </CookbookCardIcon>
              <CookbookCardIcon>
                <DeleteOutlineIcon />
              </CookbookCardIcon>
            </CookbookCardIconAlign>
          </ColAlign>
        </CookbookCardBody>
      </CookbookCardContainer>
    </div>
  );
};
