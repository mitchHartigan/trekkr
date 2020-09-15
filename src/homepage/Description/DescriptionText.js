import React from "react";
import styled from "styled-components";
import Span from "../Span";

export const DescriptionText = () => {
  return (
    <Container>
      <Title>Get more out of the outdoors.</Title>
      <Span color="white" align="flex-start" />
      <Text>
        Your gear is important to you, and you choose it carefully. With Pakkit,
        you can find out how your pack weight breaks down by each item inside of
        it. We make it easy to share your setup with others, and improve it.
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 35vw;
  padding-left: 5vw;
`;

const Text = styled.h1`
  font-family: Titillium Web;
  font-size: 20px;
  font-weight: 300;
  color: white;
  margin: 20px 0px 0px 0px;
  letter-spacing: 0.75px;
`;

const Title = styled.p`
  font-size: 25px;
  font-family: Titillium Web;
  font-weight: 300;
  color: white;
  margin: 0px 0px 5px 0px;
  letter-spacing: 0.5px;
`;
