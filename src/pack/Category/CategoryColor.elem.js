import styled from "styled-components";

export const CategoryColor = styled.div`
  transition: opacity 150ms ease;
  opacity: ${(props) => (props.isHidden ? "0" : "1")};
  height: 10px;
  width: 10px;
  background-color: ${(props) => props.color};
  margin-right: 5px;
  margin-left: 10px;
  border-radius: 60%;
  flex-shrink: 0;
`;
