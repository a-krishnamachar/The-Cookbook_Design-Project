import React from "react";
import { Header, CardAlign, DeleteIconAlign } from "../../styles/styled";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.states = {
      id: "",
    };
    this.updateId = this.updateId.bind(this);
  }

  componentDidMount() {
    this.updateId();
    // let fields = {};
    // fields["creator"] = this.props.firebase.currentUserId();
    // // console.log("debug " + Object.keys(this.props.values.values));
    // fields["title"] = this.props.values.values["title"];
    // fields["ingredients"] = this.props.values.values["ingredients"];
    // fields["instructions"] = this.props.values.values["instructions"];
    // fields["image"] = this.props.values.values["image"];
    // this.props.firebase.addRecipe(fields);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.updateId();
    }
  }

  updateId() {
    this.setState({ id: this.props.id });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          console.log("this.props.values " + this.props.id);
          this.props.firebase.removeRecipe(this.props.id);
          return <div></div>;
        }}
      </AuthUserContext.Consumer>
      //then call the recipe cards to show up below
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Delete);
