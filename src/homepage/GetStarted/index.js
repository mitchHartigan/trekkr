import React from "react";
import styled from "styled-components";
import LoginCard from "./LoginCard";
import PageTitle from "./PageTitle";

export default function GetStarted() {
  return (
    <Container id="signup-cards">
      <PageTitle>Start using Pakkit</PageTitle>
      <CardsContainer>
        <LoginCard
          title="Create a free account"
          description={`Sign up with your name and email to save your data.
          Easily share your breakdown with others via a link.`}
          buttonText="Coming Soon"
          disabled={true}
        />
        <LoginCard
          title="Start without an Account"
          description={`Continue without making an account. Your data will 
          be saved locally, but you won’t be able to share it with others until you sign up.`}
          buttonText="Start Now"
          link={"/pack"}
        />
      </CardsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
`;
