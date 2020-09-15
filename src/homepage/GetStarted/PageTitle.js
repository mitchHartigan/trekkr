import React from "react";
import styled from "styled-components";
import Span from "../Span";

export default function PageTitle(props) {
  return (
    <Container>
      <Title>{props.children}</Title>
      <Span />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px 0px;
`;

const Title = styled.h1`
  font-family: Titillium Web;
  font-size: 30px;
  font-weight: 300;
  text-align: center;
  width: 100%;
  margin-bottom: 0px;
`;
