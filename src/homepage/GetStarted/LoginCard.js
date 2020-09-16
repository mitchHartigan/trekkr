import React from "react";
import styled from "styled-components";
import PageTitle from "./PageTitle";
import Button from "../Button";

export default function LoginCard(props) {
  return (
    <Container>
      <PageTitle>{props.title}</PageTitle>
      <Description>{props.description}</Description>
      <Button link={props.link} disabled={props.disabled}>
        {props.buttonText}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  width: 380px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  background-color: white;
  box-shadow: 3px 3px 4px gray;
  margin: 20px;
  padding: 30px 20px 10px 20px;
`;

const Description = styled.p`
  font-family: Titillium Web;
  font-size: 20px;
  font-weight: 300px;
  margin: 40px 0px 35px 0px;
  text-align: center;
`;
