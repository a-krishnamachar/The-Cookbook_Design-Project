import React from "react";
import { Header, FriendAlign, FriendCardAlign } from "../../styles/styled";
import { FriendCard } from "../FriendCard/FriendCard";
import { AuthUserContext, withAuthorization } from "../Session";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";

//dummy data
import User from "../../toy-data/food-data";

//search bar
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";


class Search extends React.Component {
  constructor(){
    super();

    this.state={
      search:null
    };
  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }

  componentDidMount() {
    console.log("search did mount")
    const recipes = this.props.firebase.recipes();
    console.log("firebase all recipes", recipes);

  }

  render() {

    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          //console.log(authUser);
          // console.log("user",User);
          return (
            <div>
              <Header> Search </Header>
              
              <FriendAlign>
                <TextField
                  placeholder={"Search dish, ingredient, flavor..."}
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
              
                <FriendCardAlign>
                  {/* {users} */}
                </FriendCardAlign>
              </FriendAlign>
            </div>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(Search);
