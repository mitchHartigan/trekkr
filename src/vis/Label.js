import React, { Component } from "react";
import styled from "styled-components";

export default class Label extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: 12,
      text: this.props.children,
    };
  }

  componentDidMount() {
    this.setState({
      fontSize: this._getFontSize(
        this.props.containerHeight,
        this.props.containerWidth
      ),
    });
    this._abbreviateText(this.props.containerHeight, this.props.containerWidth);
  }

  _getFontSize(containerHeight, containerWidth) {
    const minFontSize = 14;
    const maxFontSize = 50;

    let dynamicFontSize = Math.floor(containerWidth / 10);

    // rewrite these both as a ternary?
    if (dynamicFontSize > maxFontSize) {
      dynamicFontSize = maxFontSize;
      //
    } else if (dynamicFontSize < minFontSize) {
      dynamicFontSize = minFontSize;
    }

    return dynamicFontSize;
  }

  _abbreviateText(containerHeight, containerWidth) {
    const minContainerWidth = 100;
    const minContainerHeight = 60;

    if (
      containerWidth < minContainerWidth ||
      containerHeight < minContainerHeight
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
  opacity: 0%;
  transition: opacity 50ms linear;
  &:hover {
    opacity: 100%;
    transition: opacity 50ms linear;
  }
`;

const Text = styled.p`
  color: white;
  font-family: "Alata", sans serif;
  font-size: ${(props) => `${props.fontSize}px`};
`;
