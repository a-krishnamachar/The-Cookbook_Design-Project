import React from "react";
import SignOut from "../SignOut/SignOut";
import { Header } from "../../styles/styled";
import { AddBtn } from "../../styles/styled";
import { IconAlign } from "../../styles/styled";
import { withAuthorization } from "../Session";

import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";


class MyCookbook extends React.Component {
  render() {
    return (
      <div>
        <Header> My Cookbook <SignOut/></Header>

      <TextField
        placeholder={"Search your collections..."}
        onChange={(e)=>this.searchSpace(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <AddBtn><button>+</button>
      </AddBtn>
      </div>

      //then call the recipe cards to show up below
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(MyCookbook);
