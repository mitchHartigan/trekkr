import React from "react";
import styled from "styled-components";
import { DescriptionText } from "./DescriptionText";

export default function Description() {
  return (
    <Container>
      <Image src="camping-gear.png" alt="" />
      <DescriptionText />
    </Container>
  );
}

const Container = styled.div`
  min-height: 45vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #222b00;
  padding-left: 5vw;
`;

const Image = styled.img`
  width: 500px;
  height: auto;
`;
