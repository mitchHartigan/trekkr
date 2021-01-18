import React from "react";
import styled from "styled-components";

export default function _Select(props) {
  return (
    <Select name={props.name}>
      {props.children.map((optionText) => {
        <Option>{optionText}</Option>;
      })}
    </Select>
  );
}

const Select = styled.select``;

const Option = styled.option``;
