import React from "react";
import { Header, PageAlign, PageCardAlign } from "../../styles/styled";
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

//Alert
import Alert from '@material-ui/lab/Alert';


class Friends extends React.Component {

  constructor(){
    super();
    this.addOrRemoveFriendAlert = this.addOrRemoveFriendAlert.bind(this);

    this.state={
      loading: true,
      alert: {
        alert: false,
        friendName: "",
        isAdding: false,
      },
      search:null,
      users: [],
      first: true
    };
  }

  getprops = async () =>{
    if (await this.state.currentUser){
      console.log("got the current user, done loading")
      this.setState({loading: false})
    }
  }

  async componentDidMount() {
    console.log("friends compDidMount")

    const users = await this.props.firebase.users();

    //get all users and save in state
    const usersData = await users.get();
    let allUsersData = usersData.docs.map(doc => {  
        return { 
          "id": doc.id,
          ...doc.data() 
        };
    }); 

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

    console.log("currentUser", currentUser)

  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }


  addOrRemoveFriendAlert(friendName, isAdding) {
    console.log(friendName);
    this.setState({
        alert: {
          alert: true,
          friendName: friendName,
          isAdding: isAdding,
        }
      })
    this.render();
    setTimeout(
      () => {
        this.setState({
          alert: {
            alert: false,
            friendName: "",
            isAdding: false,
          }
        });
        this.render();
      }, 2000);
  }
  

  render() {
    
    if(this.state.loading){
      this.getprops();
      return null;
    } else {

      let allUsers = this.state.users
      if (this.state.first) {
        allUsers = allUsers.reverse();
        this.setState({first: false})
      }
      // your user id
      const currentUser= this.state.currentUser
      // console.log("this.state.currentUser", currentUser)

      //get friend cards
      const yourFriendCards = [];
      let nonFriendCards = allUsers.filter((user)=>{
        if(this.state.search == null) //if nothing is currently in searchbar, return everything
            return user
        else if(user.name.toLowerCase().includes(this.state.search.toLowerCase())){
            return user
        } 
        //else{} not a match, don't return
      })
      .sort(function(a, b) { //sort alphabetically
        console.log("a.name", a.name)
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      })
      .map(user=>{
        if (user.id == currentUser.id) { //don't make a friend card for yourself
          return;
        }

        const friendsList = currentUser.friends;
        // console.log("friendsList",friendsList)
        //for every user in all users, check if its a friend, 
        //   if so "Remove Friend" button, else "Add Friend" button
        
        for(const friend of Object.values(friendsList)) {
          if (user.id == friend) { //if this user is your friend
            yourFriendCards.push(
              <FriendCard sendData={this.addOrRemoveFriendAlert} currentUser={currentUser} firebase={this.props.firebase} isFriend={true} user={user} key={`${user.id}` } />
            )
            return null;
          }
        };
        
        return( //this user is not your friend
          <FriendCard sendData={this.addOrRemoveFriendAlert} currentUser={currentUser} firebase={this.props.firebase} isFriend={false} user={user} key={`${user.id}` } />
        )
      })
      // .sort(function(a, b){
      //   if(a.firstname < b.firstname) { return -1; }
      //   if(a.firstname > b.firstname) { return 1; }
      //   return 0;
      // });

      // nonFriendCards.sort(function(a, b) {
      //   console.log("a", a)
      //   var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      //   var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      
      //   // names must be equal
      //   return 0;
      // });
      
      // yourFriendCards.sort((a, b) => a.name.localeCompare(b.name))
    

      let alert = null;
      if (this.state.alert.alert) {
        if (this.state.alert.isAdding) {
          alert = <Alert style={{position: 'absolute', marginRight: '0px'}} variant="filled" severity="success">
                  {this.state.alert.friendName} was added as a Friend!
                </Alert>
        }
        else {
          alert = <Alert style={{position: 'absolute', marginRight: '0px'}} variant="filled" severity="error">
                  {this.state.alert.friendName} was removed from your friends
                </Alert>
        }
        
      }

      return (
        <AuthUserContext.Consumer>
          {(authUser) => {
            console.log("authUser", authUser);
            // console.log("user",User);
            return (
              <div>
                {alert}
                <Header> Friends </Header>
              
                <PageAlign>
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
                
                  <PageCardAlign>
                  {yourFriendCards}
                    {nonFriendCards}
                  </PageCardAlign>
                </PageAlign>
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
