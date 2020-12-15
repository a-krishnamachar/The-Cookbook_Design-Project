import React from "react";
import { BtnNoneOutLine } from "../../styles/styled";
import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <BtnNoneOutLine onClick={firebase.doSignOut}>Sign Out</BtnNoneOutLine>
);

export default withFirebase(SignOutButton);
