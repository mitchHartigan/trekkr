import styled from "styled-components";

const colorPrimary = "transparent";
const colorSecondary = "lightgrey";

export const ItemContainer = styled.div`
  padding: 10px;
  padding-left: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props =>
    props.isDragging ? colorSecondary : colorPrimary};
  transition: background-color 0.3 ease-out;
  &: hover {
    background-color: ${colorSecondary};
    transition: background-color 0.4s ease-out;
  }
`;

export const ItemInput = styled.input`
  background-color: ${props =>
    props.isDragging ? colorSecondary : colorPrimary};
`;
