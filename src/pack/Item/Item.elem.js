import styled from "styled-components";

export const ItemContainer = styled.div`
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => (props.isDragging ? "grey" : "lightgrey")};
`;
