import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";

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
      <div id="navigation-container">
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
            icon={<PersonIcon />}
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
