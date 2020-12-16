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
`;

export const UserIconAlign = styled.div`
  color: #6c757d;
  opacity: 0.5;
  margin-right: 10px;
  line-height: 47px;
`;

export const GeneralText = styled.p`
  line-height: 25px;
  color: #6c757d;
  font-family: muli;
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
  margin-top: 5px;
  margin-left: 0;
  justify-content: left;
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
  background-position: center center;
  background-repeat: no-repeat;
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
  line-height: 3px;
`;

export const ColAlign = styled.div``;
