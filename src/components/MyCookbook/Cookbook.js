import React from "react";
import SignOut from "../SignOut/SignOut";
import { withAuthorization } from "../Session";

class MyCookbook extends React.Component {
  render() {
    return (
      <div>
        <h1> My Cookbook </h1>
        <SignOut />
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(MyCookbook);
