import styled from "styled-components";

export const CategoryContainer = styled.div`
  background-color: ${(props) =>
    props.isDraggingOver ? "#e1e8e2" : "#FFFFFF"};
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0vh 10px 0vh 10px;
  margin: 3vh 1vw 0vh 0vw;
  width: 50vw;
  max-height: 80vh;
  border-radius: 0px;
  overflow-y: scroll;
  box-shadow: 2px 5px 10px 0px #b5b5b5;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryTitle = styled.input`
  border: none;
  font-size: 16pt;
  margin: 10px;
  margin-left: 0px;
  padding-left: 5px;
  border: none;
  &:hover {
    outline: 2px solid black;
  }
`;

export const AddANewItemButton = styled.button`
  border: none;
  padding: 10px;
  margin: 10px 10px 20px 10px;
  height: 42px;
  text-align: center;
  background-color: #99c4a3;
  padding-left: 0px;
  cursor: pointer;
  color: black;
  border-radius: 3px;
  &: hover {
    background-color: #7dab87;
    transition: background-color 150ms;
  }
  outline: none;
`;
