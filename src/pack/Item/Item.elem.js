import styled from "styled-components";

export const ItemContainer = styled.div`
  padding: 10px;
  padding-left: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => (props.isDragging ? "white" : "transparent")};
  box-shadow: ${(props) => (props.isDragging ? "1px 2px 10px grey" : "none")};
  transition: background-color 0.3s ease-out;
`;

export const ItemInput = styled.input`
  background-color: ${(props) => (props.isDragging ? "white" : "transparent")};
`;

export const ItemSelect = styled.select`
  background-color: ${(props) => (props.isDragging ? "white" : "transparent")};
`;
