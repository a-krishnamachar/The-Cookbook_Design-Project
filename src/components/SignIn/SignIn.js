import React, { Component } from "react";

import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import SignInForm from "./SignInForm";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: {
    isError: false,
    message: "",
  },
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((data) => {
        //When signed in successfully reroute the user to the home page.
        this.props.history.push(ROUTES.SEARCH);
        this.setState({
          ...INITIAL_STATE,
        });
      })
      .catch((err) => {
        this.setState({
          error: {
            isError: true,
            message: err.message,
          },
        });
      });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div id="signin">
        <h2> Sign In </h2>

        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="email"
              name="email"
              label="Email"
              onChange={this.onChange}
              value={email}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <LockIcon />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={this.onChange}
              value={password}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Button
            onClick={this.onSubmit}
            disabled={!email || !password}
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          Don't have an account?
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </Grid>

        {error.isError && <p>{error.message}</p>}
      </div>
    );
  }
}

export default withFirebase(SignIn);
