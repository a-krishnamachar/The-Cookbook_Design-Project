import React from "react";
import {
  CardContainer,
  CardBody,
  CardTitle,
  CardText,
  CardAuthorText,
  CardImage,
  RowAlign,
  DescriptionAlign,
  UserAlign,
  UserIconAlign,
} from "../../styles/styled";
import CardButton from "./CardButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const Card = ({ foodItem }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div>
      <CardContainer>
        <CardImage
          src={foodItem.image}
          alt={foodItem.name}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <CardBody>
          {/* <RowAlign>
            
            <CardText>{foodItem.description}</CardText>
          </RowAlign> */}
          <RowAlign>
            <CardTitle>{foodItem.name}</CardTitle>
            <DescriptionAlign>
              <UserAlign>
                <UserIconAlign>
                  <AccountCircle />
                </UserIconAlign>
                <CardAuthorText>{foodItem.author}</CardAuthorText>
              </UserAlign>
              <CardText>{foodItem.time}</CardText>
              <CardText>{foodItem.difficulty}</CardText>
            </DescriptionAlign>
          </RowAlign>
        </CardBody>
        <CardButton
          foodID={foodItem.id}
          price={foodItem.price}
          name={foodItem.name}
          labelName="Save"
        />
      </CardContainer>
    </div>
  );
};
