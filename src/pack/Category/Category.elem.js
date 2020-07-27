import styled from "styled-components";

export const CategoryContainer = styled.div`
  background-color: ${(props) =>
    props.isDraggingOver ? "#E1CDB7" : "#EDE1D4"};
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
  padding: 10px;
  margin: 10px 10px 20px 10px;
  height: 42px;
  text-align: center;
  background-color: #9ac5fe;
  transition: background-color 50ms ease;
  padding-left: 0px;
  cursor: pointer;
  color: black;
  border-radius: 3px;
  &: hover {
    background-color: #89bbfe;
    transition: background-color 50ms;
  }
  outline: none;
`;
