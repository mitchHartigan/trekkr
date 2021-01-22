import React from "react";
import styled from "styled-components";

export function _UnitSelect(props) {
  const { name, handleUpdate, value, children } = props;
  return (
    <Select name={name} onChange={handleUpdate} value={value}>
      {children}
    </Select>
  );
}

export const Option = styled.option`
  cursor: pointer;
`;

const Select = styled.select`
  border: none;
  box-sizing: border-box;
  width: 45px;
  height: 100%;
  padding: 2px 5px 5px 5px;
  outline: none;
  font-family: Alata;
  font-size: 14px;
  background: url(selectArrow.png) no-repeat right transparent;
  -webkit-appearance: none;
  background-position-x: 28px;
  background-position-y: 11px;
  transition: background-color 100ms linear;
  cursor: pointer;
  &: hover {
    background-color: #d1d6cb;
  }
`;
