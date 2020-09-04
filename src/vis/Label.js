import React, { Component } from "react";
import styled from "styled-components";
import { getWidthOfText } from "../pack/BackpackData/utils";

export default class Label extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: 12,
      text: this.props.children,
    };
  }

  componentDidMount() {
    const fontSize = this._getFontSize(
      this.props.containerHeight,
      this.props.containerWidth
    );
    this.setState({ fontSize: fontSize });

    this._abbreviateText(
      this.props.containerHeight,
      this.props.containerWidth,
      fontSize
    );
  }

  _getFontSize(containerHeight, containerWidth) {
    const minFontSize = 14;
    const maxFontSize = 50;

    let dynamicFontSize = Math.floor(containerWidth / 10);

    while (
      getWidthOfText(this.state.text, dynamicFontSize, "Alata") >=
      containerWidth
    ) {
      dynamicFontSize = dynamicFontSize * 0.9;
    }

    if (dynamicFontSize > containerHeight / 2) {
      dynamicFontSize = containerHeight / 2;
    }
    // rewrite these both as a ternary?
    if (dynamicFontSize > maxFontSize) {
      dynamicFontSize = maxFontSize;
      //
    } else if (dynamicFontSize < minFontSize) {
      dynamicFontSize = minFontSize;
    }

    return dynamicFontSize;
  }

  _abbreviateText(containerHeight, containerWidth, fontSize) {
    const minContainerWidth = 100;
    const minContainerHeight = 60;

    const labelWidth = getWidthOfText(this.state.text, fontSize, "Alata");

    if (
      containerWidth < minContainerWidth ||
      containerHeight < minContainerHeight ||
      labelWidth >= containerWidth
    ) {
      this.setState({ text: "..." });
    }
  }

  render() {
    return (
      <Container>
        <Text fontSize={this.state.fontSize}>{this.state.text}</Text>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 200ms ease;
  &:hover {
    opacity: 1;
    transition: opacity 200ms ease;
  }
`;

const Text = styled.p`
  color: white;
  font-family: "Alata", sans serif;
  font-size: ${(props) => `${props.fontSize}px`};
  text-shadow: 0px 0.12vw 0.05vw black;
`;
