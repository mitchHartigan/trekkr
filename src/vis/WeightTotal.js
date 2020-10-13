import React from "react";
import styled from "styled-components";

export default function WeightTotal(props) {
  return (
    <Container>
      <Description>Total Pack Weight: </Description>
      <Amount>{props.weight}</Amount>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 10%;
  margin-top: -25px;
`;

const Description = styled.h1`
  font-family: Alata;
  font-size: 25px;
  font-weight: 400;
`;

const Amount = styled(Description)`
  color: #607a00;
  margin-left: 10px;
`;
