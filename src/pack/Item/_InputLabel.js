import React from "react";
import styled from "styled-components";

export default function InputLabel(props) {
  return <Label for={props.target}>{props.text}</Label>;
}

const Label = styled.label`
  font-family: Alata;
  font-size: 14px;
`;
