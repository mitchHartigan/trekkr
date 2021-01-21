import React from "react";
import styled from "styled-components";

export default function InputLabel(props) {
  return <Label htmlFor={props.target}>{props.children}</Label>;
}

const Label = styled.label`
  font-family: Alata;
  font-size: 14px;
  padding-bottom: 2px;
`;
