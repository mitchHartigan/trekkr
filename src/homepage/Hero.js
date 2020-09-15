import React from "react";
import styled from "styled-components";

export default function Hero() {
  return (
    <Container>
      <HeroImage>
        <TitleText>Welcome to Pakkit.</TitleText>
        <SubtitleText>The simplest way to visualize your pack.</SubtitleText>
        <ButtonContainer>
          <Button>Get Started</Button>
        </ButtonContainer>
      </HeroImage>
    </Container>
  );
}

const TitleText = styled.h1`
  font-family: Titillium Web;
  font-size: 100px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 0px;
  background-color: transparent;
`;

const SubtitleText = styled(TitleText)`
  font-weight: 400;
  font-size: 30px;
  margin-top: 0px;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;

const HeroImage = styled.div`
  height: 100vh;
  padding-top: 20vh;
  background-image: url("mountains.png");
  background-position: center bottom;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Button = styled.button`
  padding: 5px 20px 5px 20px;
  font-family: Alata;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  color: #f6f5f0;
  background-color: #303d00;
  border: none;
  border-radius: 5px;
  outline: none;
  &: hover {
    background-color: #222b00;
    color: white;
    box-shadow: 0px 2px 3px grey;
  }
  transition: background-color 150ms ease;
  transition: box-shadow 150ms ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 35px 0px 10px 0px;
`;
