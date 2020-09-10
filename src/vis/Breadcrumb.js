import React, { Component } from "react";
import styled from "styled-components";
import "../index.css";
import { CategoryColor } from "../pack/Category/CategoryColor.elem";

export default class Breadcrumb extends React.Component {
  render() {
    return (
      <Container>
        <CategoryColor
          color={this.props.baseColor}
          isHidden={this.props.hidden}
        />
        <BreadcrumbText isHidden={this.props.hidden}>
          {`${this.props.category} ⤚ ${this.props.item} (${this.props.weight})`}
        </BreadcrumbText>
      </Container>
    );
  }
}

const BreadcrumbText = styled.h1`
  transition: opacity 150ms ease;
  opacity: ${(props) => (props.isHidden ? "0" : "1")};
  font-family: "Alata", sans serif;
  font-size: 1.5vw;
  text-align: center;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 10px;
`;

const Container = styled.div`
  opacity: ${(props) => (props.isHidden ? "0" : "1")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 45vw;
  margin-top: -3vh;
`;
