import React from "react";
import styled from "styled-components";
import { CategoryColor } from "../pack/Category/CategoryColor.elem";

export function Tooltip(props) {
  const { x, y, item, weight, hidden, baseColor } = props;

  return (
    <Container
      x={x}
      y={y}
      isHidden={hidden}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <CategoryColor color={baseColor} />
      <ItemText>{`${item}`}</ItemText>
      <WeightText>{`(${weight})`}</WeightText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: ${(props) => (props.isHidden ? "0" : "1")};
  max-width: 350px;
  position: absolute;
  margin-top: -40px;
  margin-left: 0px;
  background-color: white;
  box-shadow: 2px 2px 5px grey;
  border-radius: 2px;
  transition: opacity 100ms ease;
`;

const WeightText = styled.p`
  font-family: Alata;
  font-size: 14px;
  margin: 5px;
  white-space: nowrap;
`;

const ItemText = styled(WeightText)`
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: -2px;
`;
