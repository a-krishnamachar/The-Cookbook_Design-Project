import React from "react";
import { Header, CardAlign, DeleteIconAlign } from "../../styles/styled";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

class Upload extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let fields = {};
    fields["creator"] = this.props.firebase.currentUserId();
    // console.log("debug " + Object.keys(this.props.values.values));
    fields["title"] = this.props.values.values["title"];
    fields["ingredients"] = this.props.values.values["ingredients"];
    fields["instructions"] = this.props.values.values["instructions"];
    fields["image"] = this.props.values.values["image"];
    this.props.firebase.addRecipe(fields);
  }
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          return <div></div>;
        }}
      </AuthUserContext.Consumer>
      //then call the recipe cards to show up below
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Upload);
