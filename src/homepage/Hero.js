import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Parallax, Background } from "react-parallax";
import ScrollWrapper from "./ScrollWrapper";

export default function Hero() {
  return (
    <Container>
      <HeroTextContainer>
        <TitleText>Welcome to Pakkit.</TitleText>
        <SubtitleText>The simplest way to visualize your pack.</SubtitleText>

        <ScrollWrapper target="signup-cards">
          <Button>Get Started</Button>
        </ScrollWrapper>
      </HeroTextContainer>

      <Parallax blur={0} strength={300}>
        <Spacer />
        <Background className="custom-bg">
          <BackgroundImage src="mountains.png" />
        </Background>
      </Parallax>
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
  display: flex;
  flex-direction: column;
  background-color: transparent;
  height: 100vh;
`;

const Spacer = styled.div`
  height: 50vh;
`;

const HeroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 212px;
  margin-bottom: -75px;
  z-index: 1;
`;

const BackgroundImage = styled.img`
  width: auto;
  height: 500px;
  margin-top: 200px;
`;
