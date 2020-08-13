import styled from "styled-components";

export const ItemContainer = styled.div`
  padding: 5px;
  margin: 10px;
  padding-left: 30px;
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  justify-content: space-between;
  background-color: ${(props) => (props.isDragging ? "white" : "#F9F5F1")};
  box-shadow: ${(props) =>
    props.isDragging ? "1px 2px 10px grey" : "1px 2px 5px #d1d1d1"};
  transition: background-color 0.3s ease-out;
`;
