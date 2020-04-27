import React from "react";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &: hover {
    background-color: white;
    transition: background-color 0.3s ease;
  }
`;

export default function CancelButton(props) {
  return (
    <Button onClick={props.onClick}>
      <FontAwesome className="fas fa-times" size="2x" />
    </Button>
  );
}
