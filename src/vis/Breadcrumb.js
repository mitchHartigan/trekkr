import React, { Component } from "react";
import styled from "styled-components";
import "../index.css";

export default class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };
  }

  componentDidMount() {
    this.setState({
      text: `${this.props.category} → ${this.props.item} (${this.props.weight})`,
    });
  }

  render() {
    return (
      <BreadcrumbText isHidden={this.props.hidden}>
        {`${this.props.category} → ${this.props.item} (${this.props.weight})`}
      </BreadcrumbText>
    );
  }
}

const BreadcrumbText = styled.h1`
  transition: opacity 200ms ease;
  opacity: ${(props) => (props.isHidden ? "0" : "1")};
  font-family: "Alata", sans serif;
  font-size: 1.5vw;
  width: 100%;
  text-align: center;
  font-weight: 300;
  margin-top: -3vh;
`;
