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

export const Option = styled.option``;

const Select = styled.select``;
