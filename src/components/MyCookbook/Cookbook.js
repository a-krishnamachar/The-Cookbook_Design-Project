import React from "react";
import SignOut from "../SignOut/SignOut";
import { Header } from "../../styles/styled";
import { withAuthorization } from "../Session";

class MyCookbook extends React.Component {
  render() {
    return (
      <div>
        <Header> My Cookbook </Header>
        <SignOut />
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(MyCookbook);
