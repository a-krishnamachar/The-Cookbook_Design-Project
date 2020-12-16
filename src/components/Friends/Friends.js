import React from "react";
import { Header, FriendAlign, FriendCardAlign } from "../../styles/styled";
import { FriendCard } from "../FriendCard/FriendCard";
import { AuthUserContext, withAuthorization } from "../Session";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import firebase from "firebase";

//search bar
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";


class Friends extends React.Component {

  constructor(){
    super();

    this.state={
      loading: true,
      search:null,
      users: []
    };
  }

  
  getprops = async () =>{
    if (await this.state.currentUser){
      console.log("got the current user, done loading")
      this.setState({loading: false})
    }
  }

  async componentWillMount() {
    console.log("friends compDidMount")

    const users = await this.props.firebase.users();

    //get all users and save in state
    const usersData = await users.get();
    let allUsersData = usersData.docs.map(doc => {  
        return { 
          "id": doc.id,
          ...doc.data() 
        };
    }); //add in doc.id here
    console.log("all usersData",allUsersData)
    this.setState({
      users: allUsersData
    })

     //save info about current user
    const currentUserUId =  await firebase.auth().currentUser.uid

    let currentUser = []
    this.state.users.map(user=>{
      if (user.id == currentUserUId) { //this is you
        currentUser = {
          "id": user.id,
          "friends": user.friends
        }
      }
    });
    this.setState({
      currentUser: currentUser
    })
    console.log("currentUser!!!", currentUser)


    //Faith
    //2DzHunNjPCOWdKQ0SDIGwNvil702

    //Jacob
    //1234

    // this.props.firebase.addFriend("2DzHunNjPCOWdKQ0SDIGwNvil702", "1234");
  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }

  render() {

    if(this.state.loading){
      this.getprops();
      return null;
    } else {

      // your user id
      const currentUser= this.state.currentUser
      // console.log("this.state.currentUser", currentUser)

      //get friend cards
      const allFriendCards = this.state.users.filter((user)=>{
        if(this.state.search == null)
            return user
        else if(user.name.toLowerCase().includes(this.state.search.toLowerCase())){
            return user
        }
      }).map(user=>{
        if (user.id == currentUser.id) { //don't make a friend card for yourself
          return;
        }

        //for every freind in all users, check if its in friends, 
        //   if so "Remove Friend" button, else "Add Friend" button
        for(const friend of Object.values(currentUser.friends)) {
          console.log("friend", friend, "userId",user.id)
          if (user.id == friend) { //if this user is your friend
            return(
              <FriendCard isFriend={true} user={user} key={`${user.id}` } />
            )
          }
        };
        
        return( //this user is not your friend
          <FriendCard isFriend={false} user={user} key={`${user.id}` } />
        )
      })


      return (
        <AuthUserContext.Consumer>
          {(authUser) => {
            console.log("authUser", authUser);
            // console.log("user",User);
            return (
              <div>
                <Header> Friends </Header>
                
                <FriendAlign>
                  <TextField
                    placeholder={"Find Friends..."}
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
                    {allFriendCards}
                  </FriendCardAlign>
                </FriendAlign>
              </div>
            );
          }}
        </AuthUserContext.Consumer>
      );
    }
  }
}


// const condition = (authUser) => !!authUser;

export default withFirebase(Friends);
