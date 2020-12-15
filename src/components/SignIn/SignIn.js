import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { withFirebase } from "../Firebase";
import {
  BtnNoneOutLine,
  Header,
  IconAlign,
  GeneralText,
} from "../../styles/styled";

import { branch, compose } from "recompose";

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
        this.props.history.push(ROUTES.HOME);
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
      <div id="signin" justify="center">
        <Header> Sign In </Header>
        <Grid container spacing={1} alignItems="flex-end" justify="center">
          <IconAlign>
            <Grid item>
              <EmailIcon fontSize="large" />
            </Grid>
          </IconAlign>
          <Grid item>
            <TextField
              id="email"
              name="email"
              label="Email"
              onChange={this.onChange}
              value={email}
              fullWidth
              variant="outlined"
              size="small"
              margin="normal"
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end" justify="center">
          <IconAlign>
            <Grid item>
              <LockIcon fontSize="large" />
            </Grid>
          </IconAlign>
          <Grid item>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={this.onChange}
              value={password}
              fullWidth
              variant="outlined"
              size="small"
              margin="normal"
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end" justify="center">
          <BtnNoneOutLine
            onClick={this.onSubmit}
            disabled={!email || !password}
            variant="contained"
            color="primary"
          >
            Sign In
          </BtnNoneOutLine>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end" justify="center">
          <GeneralText>
            Don't have an account?&nbsp;
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
          </GeneralText>
        </Grid>

        {error.isError && <p>{error.message}</p>}
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(SignIn);
