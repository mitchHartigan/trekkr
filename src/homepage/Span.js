import React from "react";
import styled from "styled-components";

export default function Span(props) {
  return (
    <SpanContainer align={props.align}>
      <SpanElem color={props.color} width={props.width} />
    </SpanContainer>
  );
}

const SpanElem = styled.span`
  width: ${(props) => (props.width ? props.width : "10vw")};
  height: 2px;
  background: ${(props) => (props.color ? props.color : "black")};
`;

const SpanContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.align ? props.align : "center")};
  align-items: center;
`;
