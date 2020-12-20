import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import "./navigation.css";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  setValue = (value) => {
    console.log(value);
    this.setState({
      value: value,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div
        id="navigation-container"
        style={{ position: "relative", zIndex: "10" }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            this.setValue(newValue);
          }}
          showLabels
          className="bottomNav"
        >
          <BottomNavigationAction
            component={Link}
            to={ROUTES.HOME}
            label="Home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to={ROUTES.SEARCH}
            label="Search"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to={ROUTES.MYCOOKBOOK}
            label="Cookbook"
            icon={<MenuBookIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to={ROUTES.FRIENDS}
            label="Friends"
            icon={<GroupIcon />}
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default Navigation;

/*
Sources:
https://material-ui.com/components/bottom-navigation/
*/
