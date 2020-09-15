import React from "react";
import styled from "styled-components";

export default function Span(props) {
  return (
    <SpanContainer align={props.align}>
      <SpanElem color={props.color} />
    </SpanContainer>
  );
}

const SpanElem = styled.span`
  width: 10vw;
  height: 1px;
  background: ${(props) => (props.color ? props.color : "black")};
`;

const SpanContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.align ? props.align : "center")};
  align-items: center;
`;
