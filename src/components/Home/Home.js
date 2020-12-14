import React from "react";

import { AuthUserContext, withAuthorization } from "../Session";

class Home extends React.Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          console.log(authUser);
          return (
            <div>
              <h1> Home </h1>
            </div>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
