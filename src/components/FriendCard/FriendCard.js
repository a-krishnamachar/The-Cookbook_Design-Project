import React from "react";
import {
  FriendCardContainer,
  FriendCardBody,
  CardTitle,
  CardText,
  RowAlign,
  DescriptionAlign,
  UserAlign,
  AddBtn, 
  RemoveBtn
} from "../../styles/styled";

export class FriendCard extends React.Component {

    constructor(){
      super();

      this.state={
        isFriend: false
      };
    }

    componentWillMount() {
        const isFriend = this.props.isFriend;
        this.setState({
            isFriend: isFriend
          })
    }

    addFriend(friendId) {
        // console.log('this is:', this);

        // add friend in firebase
        this.props.firebase.addFriend(this.props.currentUser.id, friendId);

        //update the dom
        this.setState({
            isFriend: !this.state.isFriend
          })
        this.render()
    }

    removeFriend(friendId) {
        //remove friend in firebase
        this.props.firebase.removeFriend(this.props.currentUser.id, friendId);

        //update the dom
        this.setState({
            isFriend: !this.state.isFriend
          })
        this.render()
    }

    goToUsersCookbook(user) {
        console.log("in goToUsersCookbook with user:", user)
    }

    render() {
        const user = this.props.user;
        const isFriend = this.state.isFriend;

        const FriendButton = ({  }) => {
            if (!isFriend) {
                return (
                    <AddBtn onClick={() => this.addFriend(user.id)}>{"Add Friend"}</AddBtn>
                );
            }
            return (
                <RemoveBtn onClick={() => this.removeFriend(user.id)}>{"Remove Friend"}</RemoveBtn>
            );
        };
        
        return (
            <div>
            <FriendCardContainer>

                <FriendCardBody onClick={() => this.goToUsersCookbook(user)}>
                    <CardTitle>{user.name}</CardTitle>
                </FriendCardBody>
                
                <FriendButton/>

            </FriendCardContainer>
            </div>
        );
    }
}

