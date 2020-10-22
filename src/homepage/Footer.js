import React from "react";
import styled from "styled-components";

export default function Footer() {
  return <Container />;
}

const Container = styled.div`
  height: 400px;
  background-image: url("footer-img.png");
  background-repeat: no-repeat;
  filter: blur(1px);
`;
