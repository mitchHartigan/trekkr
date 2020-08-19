import React from "react";
import styled from "styled-components";
import "../index.css";

export default function Breadcrumb(props) {
  return (
    <BreadcrumbText
      hidden={props.hidden}
    >{`${props.category} → ${props.item} (${props.weight})`}</BreadcrumbText>
  );
}

const BreadcrumbText = styled.h1`
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  font-family: Open Sans Condensed;
  font-size: 2vw;
  font-weight: 300;
`;
