import React from "react";
import { Link } from "react-router-dom";
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

    addFriend(friend) {
        // console.log('this is:', this);

        // add friend in firebase
        this.props.firebase.addFriend(this.props.currentUser.id, friend.id);

        //update the dom
        this.setState({
            isFriend: !this.state.isFriend
          })
        
        this.props.sendData(friend.name, true);
        
        this.render()
    }

    removeFriend(friend) {
        //remove friend in firebase
        this.props.firebase.removeFriend(this.props.currentUser.id, friend.id);

        //update the dom
        this.setState({
            isFriend: !this.state.isFriend
          })

        this.props.sendData(friend.name, false);

        this.render()
    }

    goToUsersCookbook(user) {
        // const { history } = this.props;
        // this.props.history.push({
        //     pathname: '/friendCookbook',
        //     state: { user: this.props.user }
        //   })
        console.log("in goToUsersCookbook with user:", user)
        // this.props.history.push();
    }

    render() {
        const user = this.props.user;
        const isFriend = this.state.isFriend;

        const FriendButton = () => {
            if (!isFriend) {
                return (
                    <AddBtn onClick={() => this.addFriend(user)}>{"Add Friend"}</AddBtn>
                );
            }
            return (
                <RemoveBtn onClick={() => this.removeFriend(user)}>{"Remove Friend"}</RemoveBtn>
            );
        };
        
        return (
            <div>
            <FriendCardContainer>
               
                    <FriendCardBody>
                        <Link
                            to={{pathname: "/friendsCookbook", data: user}}
                            style={{ textDecoration: "none" }}
                        >
                            <CardTitle>{user.name}</CardTitle>
                        </Link>
                    </FriendCardBody>
                
                
                  <FriendButton/>
                

            </FriendCardContainer>
            </div>
        );
    }
}

