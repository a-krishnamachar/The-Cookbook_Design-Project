import React from "react";
import { Card } from "../Card/Card";
import { Header, CardAlign } from "../../styles/styled";
import food from "../../toy-data/food-data";
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
              <CardAlign>
                {food.map((foodItem) => (
                  <Card foodItem={foodItem} key={`${foodItem.id}`} />
                ))}
              </CardAlign>
            </div>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
