import React from "react";
import { Header } from "../../styles/styled";
import { AuthUserContext, withAuthorization } from "../Session";

class Home extends React.Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          console.log(authUser);
          return (
            <div>
              <Header> Home </Header>
            </div>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
