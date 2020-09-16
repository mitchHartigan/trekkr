import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// TODO: refactor using HOC
export default function Button(props) {
  if (props.link) {
    return (
      <ButtonContainer>
        <NavLink to={{ pathname: props.link }}>
          <ButtonElem disabled={props.disabled}>{props.children}</ButtonElem>
        </NavLink>
      </ButtonContainer>
    );
  } else {
    return (
      <ButtonContainer>
        <ButtonElem disabled={props.disabled}>{props.children}</ButtonElem>
      </ButtonContainer>
    );
  }
}

const ButtonElem = styled.button`
  padding: 5px 20px 5px 20px;
  font-family: Alata;
  font-size: 20px;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  color: #f6f5f0;
  background-color: #303d00;
  border: none;
  border-radius: 5px;
  outline: none;
  &: hover {
    ${(props) => {
      if (props.disabled) {
        return "";
      }
      return `
        background-color: #222b00;
        color: white;
        box-shadow: 0px 2px 3px grey;
      `;
    }}
  }
  transition: background-color 150ms ease;
  transition: box-shadow 150ms ease;
  opacity: ${(props) => (props.disabled ? "30%" : "100%")};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 35px 0px 10px 0px;
`;
