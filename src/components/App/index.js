import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "../Home/Home.js";
import SearchPage from "../Search/Search.js";
import MyCookbookPage from "../MyCookbook/Cookbook.js";
import FriendsPage from "../Friends/Friends.js";
import SignIn from "../SignIn/SignIn.js";

import * as ROUTES from "../../constants/routes";
import Navigation from "../Navigation";

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.HOME} component={SignIn} />
      <Route path={ROUTES.SEARCH} component={SearchPage} />
      <Route path={ROUTES.MYCOOKBOOK} component={MyCookbookPage} />
      <Route path={ROUTES.FRIENDS} component={FriendsPage} />
    </div>
  </Router>
);

export default App;
