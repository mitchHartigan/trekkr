import styled from "styled-components";

export const CategoryContainer = styled.div`
  background-color: ${props =>
    props.isDraggingOver ? "lightblue" : "transparent"};
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
