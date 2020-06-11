import styled from "styled-components";

export const CategoryContainer = styled.div`
  background-color: ${props =>
    props.isDraggingOver ? "lightgreen" : "transparent"};
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const CategoryTitle = styled.input`
  border: none;
  font-size: 16pt;
  margin: 10px;
`;

export const AddANewItemButton = styled.button`
  border: none;
  padding: 10px 10px 10px 10px;
  margin-left: 30px;
  width: 10%;
  text-align: left;
  background-color: transparent;
  padding-left: 0px;
  cursor: pointer;
  color: darkgreen;
  &: hover {
    text-decoration: underline;
    transition: text-decoration 1s ease;
  }
  outline: none;
`;
