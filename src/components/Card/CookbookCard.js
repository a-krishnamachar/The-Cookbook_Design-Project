import React from "react";
import {
  CookbookCardContainer,
  CookbookCardBody,
  CardTitle,
  CardText,
  CardAuthorText,
  CookbookCardImage,
  RowAlign,
  ColAlign,
  DescriptionAlign,
  UserAlign,
  UserIconAlign,
} from "../../styles/styled";

import CardButton from "./CardButton";

export const CookbookCard = ({ recipe }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div>
      <CookbookCardContainer>
        <CookbookCardBody>
          <CookbookCardImage
            src={recipe.image}
            alt={recipe.title}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
          <ColAlign>
            <CardTitle>{recipe.title}</CardTitle>
            <DescriptionAlign>
              <CardText>{"56 people viewed"}</CardText>
              <CardText>{"9 people used your recipe"}</CardText>
            </DescriptionAlign>
          </ColAlign>
        </CookbookCardBody>
      </CookbookCardContainer>
    </div>
  );
};
