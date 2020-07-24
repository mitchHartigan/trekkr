import styled from "styled-components";

export const ItemContainer = styled.div`
  padding: 10px;
  margin: 10px;
  padding-left: 30px;
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  justify-content: space-between;
  background-color: ${(props) => (props.isDragging ? "white" : "#F9F5F1")};
  box-shadow: ${(props) =>
    props.isDragging ? "1px 2px 10px grey" : "1px 2px 5px #E1CDB7"};
  transition: background-color 0.3s ease-out;
`;
