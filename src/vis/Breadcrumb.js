import React, { Component } from "react";
import styled from "styled-components";
import "../index.css";
import { CategoryColor } from "../pack/Category/CategoryColor.elem";

export default class Breadcrumb extends React.Component {
  render() {
    return (
      <Container>
        <div>
          <CategoryColor
            color={this.props.baseColor}
            isHidden={this.props.hidden}
          />
          <BreadcrumbText isHidden={this.props.hidden}>
            {`${this.props.category} → ${this.props.item} (${this.props.weight})`}
          </BreadcrumbText>
        </div>
      </Container>
    );
  }
}

const BreadcrumbText = styled.h1`
  transition: opacity 150ms ease;
  opacity: ${(props) => (props.isHidden ? "0" : "1")};
  font-family: "Alata", sans serif;
  font-size: 1.5vw;
  width: 100%;
  text-align: center;
  font-weight: 300;
  margin-top: -3vh;
  margin-left: 1vw;
`;

const Container = styled.div`
  opacity: ${(props) => (props.isHidden ? "0" : "1")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
