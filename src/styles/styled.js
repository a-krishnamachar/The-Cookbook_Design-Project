import styled from "styled-components";
import React from "react";

// Buttons
function Button({ className, children, ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export const BtnDefault = styled(Button)`
  min-height: 50px;
  min-width: 100px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  background: linear-gradient(70deg, #fff, #000);
  border-bottom: 5px solid #c44267;
  outline: none;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #ededed;
  -webkit-transition: ease-out 0.5s;
  -moz-transition: ease-out 0.5s;
  transition: ease-out 0.5s;
  &:hover {
    box-shadow: inset 400px 0 0 0 #ededed;
  }
`;

export const BtnRed = styled(BtnDefault)`
  background: linear-gradient(70deg, #fc030f, #de5057);
  border-bottom: 5px solid #800020;
`;

export const BtnNoneOutLine = styled.button`
  margin-top: 10px;
  margin-bottom: 30px;
  justify-content: center;
  width: 140px;
  height: 45px;
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #f55f5f;
    box-shadow: 0px 15px 20px #f7bcbc;
    color: #fff;
    transform: translateY(-7px);
  }
`;

export const Header = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
  justify: center;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: lighter;
  color: #bdb5b5;
  font-family: muli;
  font-size: 40px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  text-align: center;
`;

export const IconAlign = styled.div`
  line-height: 37px;
  color: #6c757d;
  opacity: 0.5;
  &:hover {
    opacity: 0.3;
    cursor: pointer;
  }
`;

export const CookbookCardIconAlign = styled.div`
  flex-direction: row;
  display: flex;
`;

export const CookbookCardIcon = styled.div`
  color: #6c757d;
  opacity: 0.5;
  &:hover {
    opacity: 0.3;
    cursor: pointer;
  }
  margin-right: 20px;
`;

export const EditPageButtonAlign = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const UserIconAlign = styled.div`
  color: #6c757d;
  opacity: 0.5;
  margin-right: 10px;
  line-height: 65px;
`;

export const GeneralText = styled.p`
  line-height: 25px;
  color: #6c757d;
  font-family: muli;
`;

export const IngredientText = styled.p`
  color: #6c757d;
  font-family: muli;
  margin-left: 15%;
`;

export const CardAlign = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10%;
  justify-content: center;
`;

export const CardContainer = styled.div`
  justify-content: center;
  margin-top: 20px;
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  min-width: 0;
  height: 300px;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  overflow: hidden;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 1px;
  padding: 1.25rem;
`;

export const CardTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  font-family: muli;
  &:hover {
    color: #6c757d;
    cursor: pointer;
  }
`;

export const CardText = styled.p`
  color: #6c757d;
  font-family: muli;
  font-size: 10px;
  &:hover {
    color: #000;
    cursor: pointer;
  }
`;
export const CardAuthorText = styled(CardText)`
  font-size: 16px;
`;

export const CardHover = styled.div`
  color: white;
  text-shadow: 2px 2px #000;
  font-size: 50px;
  font-family: muli;
  position: relative;
  top: -20%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const CardImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  &:hover {
    opacity: 0.5;
    backface-visibility: hidden;
    transition: 0.5s ease;
    background-color: #000;
  }
  &:hover {
    ${CardHover}
  }
`;

export const CookbookCardContainer = styled.div`
  justify-content: center;
  display: flex;
  margin-top: -30px;
  margin-bottom: -30px;
  flex-direction: column;
  min-width: 0;
  height: 170px;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  overflow: hidden;
`;

export const CookbookCardBody = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  min-height: 1px;
  padding: 1.25rem;
`;

export const CookbookCardImage = styled.img`
  height: 100px;
  width: 150px;
  border-radius: 5%;
  margin-right: 15%;
  object-fit: cover;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  &:hover {
    opacity: 0.5;
    backface-visibility: hidden;
    transition: 0.5s ease;
    background-color: #000;
  }
  &:hover {
    ${CardHover}
  }
`;

export const SaveButton = styled(BtnNoneOutLine)`
  margin-bottom: 10px;
  width: 20%;
  height: 70%;
  margin-left: 15px;
`;

export const RowAlign = styled.div`
  display: flex;
  flex-direction: row;
  flex: auto;
  justify-content: space-between;
`;

export const UserAlign = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: -15px;
`;

export const DescriptionAlign = styled.div`
  flex-direction: column;
  line-height: 20px;
`;

export const ColAlign = styled.div``;

export const FriendCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // justify-content: flex-end;
  padding: 0px;

  margin-top: 5px;
  margin-bottom: 5px;

  min-width: 0;
  height: 60px;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  overflow: hidden;
`;

export const FriendCardBody = styled.button`
  display: flex;
  padding-left: 30px;
  padding-top: 5px;
  align-items: center;
  // background-color: purple;
  border: none;
  width: 100%;
  cursor: pointer;
  outline: none;
  &:hover {
    transition: 0.5s ease;
    background-color: #ededed;
  }
`;

export const AddBtn = styled(BtnNoneOutLine)`
  background: linear-gradient(70deg, #00b31f, #00b32a);
  height: 100%;
  margin: 0px;
  border-radius: 0px 0.5rem 0.5rem 0px;
  width: 25%;
  min-width: 75px;
  color: #fff;

  &:hover {
    opacity: 0.8;
    transform: translateY(0px);
  }
`;

export const RemoveBtn = styled(AddBtn)`
  background: linear-gradient(70deg, #de5057, #fc030f);
`;

export const PageAlign = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10%;
  justify-content: center;
`;

export const PageCardAlign = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  margin-top: 20px;
  justify-content: center;
  margin-bottom: 50px;
`;

export const SearchBoxAlign = styled.div`
  display: flex;
  margin: 10%;
  justify-content: center;
`;

export const TitleAlign = styled.div`
  margin: auto;
  display: flex;
  width: 25%;
  height: 25%;
`;

export const IngredientBox = styled.div`
  margin: 15%;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  width: 70%;
  height: 40%;
`;

export const IngredientAlign = styled.div``;

export const IngredientContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 300px;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  overflow: hidden;
`;

export const IngredientHover = styled.div`
  color: white;
  text-shadow: 2px 2px #000;
  font-size: 50px;
  font-family: muli;
  position: relative;
  top: -20%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const IngredientImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

export const IngredientBody = styled.div`
  display: flex;
  justify-content: center;
`;

export const IngredientRowAlign = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 70%;
  padding: 0.56rem;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  overflow: hidden;
`;

export const IngredientRowText = styled.div`
  padding-right: 10px;
`;

export const IngredientColAlign = styled.div`
  float: left;
  width: 25%;
  margin-right: 10%;
`;

export const InstructionColAlign = styled.div`
  float: left;
  width: 85%;
  margin-right: 10%;
`;

export const DeleteAlign = styled.div`
  float: right;
  width: 5%;
  margin-right: 10%;
`;

export const IngredientColAlignForTitle = styled.div`
  float: right;
  width: 50%;
  margin-left: 15%;
`;

export const IngredientCardAlign = styled.div`
  flex-direction: row;
  margin-bottom: 5px;
`;

export const ListAlign = styled.div`
  margin-left: 5%;
`;

export const DeleteIconAlign = styled.div`
  line-height: 37px;
  color: #6c757d;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    transform: translateY(0px);
  }
`;

export const BottomButtonAlign = styled.div`
  display: flex;
  margin-top: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
  justify-content: flex-end;
`;

export const BackBtn = styled(BtnNoneOutLine)`
  background: #fff;
  // height: 100%;
  margin: 0px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: #000;

  &:hover {
    opacity: 0.8;
    transform: translateY(0px);
  }
`;

export const AddRecipeBtn = styled(BtnNoneOutLine)`
  // background: #FFF;
  margin: 0px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: linear-gradient(70deg, #00b31f, #00b32a);
  color: white;
  &:hover {
    opacity: 0.8;
    background-color: #fff;
    transform: translateY(0px);
  }
`;

export const AddIconAlign = styled.div`
  margin-top: -10px;
  line-height: 37px;
  color: #6c757d;
`;

export const DetailedViewHeaderAlign = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5%;
  margin-bottom: 0%;
  justify-content: center;
`;

export const DetailedViewPageAlign = styled.div`
  margin-bottom: 18%;
`;

export const GoToDetailedRecipeView = styled.div`
  position: absolute;
  margin-top: -14%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
`;

export const EditIngredientAlign = styled.div`
  justify-content: flex-end;
  margin: auto;
  display: flex;
`;

export const EditIngredientTextAlign = styled.div`
  margin-right: 10%;
`;
export const FriendsCookbookBackBtn = styled.div`
  position: fixed;
  // background-color: purple;
  margin-top: 10px;
  margin-left: 10px;
`;
