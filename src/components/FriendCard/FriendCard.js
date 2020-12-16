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


const FriendButton = ({ labelName, isFriend }) => {
    if (!isFriend) {
        return (
            <AddBtn>{"Add Friend"}</AddBtn>
        );
      }
    return (
        <RemoveBtn>{"Remove Friend"}</RemoveBtn>
    );
};


export const FriendCard = ({ user, isFriend }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div>
      <FriendCardContainer>
        <FriendCardBody>
            <CardTitle>{user.name}</CardTitle>
        </FriendCardBody>
        
        <FriendButton
          isFriend={isFriend}
        />
      </FriendCardContainer>
    </div>
  );
};
