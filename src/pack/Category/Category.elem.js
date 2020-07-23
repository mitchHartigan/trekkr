import styled from "styled-components";

export const CategoryContainer = styled.div`
  background-color: ${(props) =>
    props.isDraggingOver ? "#E9F2CF " : "#F9F5F1"};
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0vh 10px 0vh 10px;
  margin: 4vh 10px 4vh 10px;
  min-width: 25vw;
  max-height: 80vh;
  border-radius: 0px;
  overflow-y: scroll;
  box-shadow: 10px 10px 20px #ebebeb;
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
  padding: 10px 10px 10px 10px;
  width: 100%;
  text-align: center;
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
