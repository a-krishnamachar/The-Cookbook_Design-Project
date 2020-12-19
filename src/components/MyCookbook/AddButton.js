import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ListItem } from "@material-ui/core";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import AddIcon from '@material-ui/icons/Add';
import { IconAlign } from "../../styles/styled";
import {
  AddIconAlign,
  AddRecipeBtn
} from "../../styles/styled";

const AddButton = (labelName) => {
  return (
    <div>
      <AddIconAlign>
        {/* <AddCircleOutline type="button" /> */}
        <AddRecipeBtn> <AddIcon /></AddRecipeBtn>
      </AddIconAlign>
    </div>
  );
};
export default AddButton;
