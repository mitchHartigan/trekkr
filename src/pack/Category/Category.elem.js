import styled from "styled-components";

export const CategoryContainer = styled.div`
  background-color: ${(props) =>
    props.isDraggingOver ? "#9fab72" : "#FFFFFF"};
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0vh 10px 0vh 10px;
  margin: 1vh 1vw 1.2vh 0.5vw;
  border-radius: 0px;
  overflow-y: scroll;
  box-shadow: 2px 2px 5px 0px #b5b5b5;
  ::-webkit-scrollbar {
    display: none;
  }
  border-radius: 2px;
`;

export const CategoryTitle = styled.input`
  border: none;
  font-size: 16pt;
  margin: 10px;
  margin-left: 5px;
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
  background-color: #607a00;
  padding-left: 0px;
  cursor: pointer;
  color: white;
  border-radius: 3px;
  &: hover {
    background-color: #708f00;
    transition: background-color 120ms;
  }
  outline: none;
  font-family: Alata;
  font-size: 14px;
`;
