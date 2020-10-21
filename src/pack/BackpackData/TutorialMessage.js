import React from "react";
import styled from "styled-components";

export default function TutorialMessage() {
  return (
    <Container>
      <DescriptionText>
        Start visualizing your pack by creating a new category, and adding some
        items to it. Or, if you want to see a finished visualization before you
        jump in, you can view this{" "}
        <ExampleLink href="#">sample pack breakdown.</ExampleLink>
      </DescriptionText>
    </Container>
  );
}

const Container = styled.div`
  background-color: #f0eee6;
  margin-right: 3vw;
  margin-left: 10px;
  padding: 40px 25px 40px 25px;
  border-radius: 2px;
  box-shadow: 2px 3px 3px #c1b99a;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DescriptionText = styled.div`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
`;

const ExampleLink = styled.a`
  font-family: Titillium Web;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: #708f00;
  text-underline-position: under;
`;
