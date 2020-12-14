import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "../Home/Home.js";
import SearchPage from "../Search/Search.js";
import MyCookbookPage from "../MyCookbook/Cookbook.js";
import FriendsPage from "../Friends/Friends.js";
import SignIn from "../SignIn/SignIn.js";
import SignUp from "../SignUp/SignUp.js";

import * as ROUTES from "../../constants/routes";
import Navigation from "../Navigation";

import { withAuthentication, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase/index.js";
import { AuthUserContext } from "../Session";

const Nav = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <Navigation /> : null)}
    </AuthUserContext.Consumer>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />

          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.SEARCH} component={SearchPage} />
          <Route path={ROUTES.MYCOOKBOOK} component={MyCookbookPage} />
          <Route path={ROUTES.FRIENDS} component={FriendsPage} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
