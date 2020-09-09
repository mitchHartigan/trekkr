import React, { Component } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export default class ItemInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      width: "120px",
      id: null,
    };
  }

  componentDidMount() {
    const id = uuidv4();
    this.setState(
      {
        id: id,
        value: this.props.inputValue,
      },
      () => {
        this.setState({ width: this._getSpanWidth(id) });
      }
    );
  }

  _getSpanWidth = (id) => {
    let width = document.getElementById(id).offsetWidth;

    if (width < 120) width = 120;
    if (width > 400) width = 500;
    return `${width}px`;
  };

  // Takes the text value from the onchange evt and places it inside the span,
  // then gets the width of the span (with the new text value) and uses the offset width
  // of that elem to inform the width of the input.
  _handleUpdate = (evt) => {
    this.props.handleUpdate(evt);
    this.setState({ value: evt.target.value }, () => {
      this.setState({ width: this._getSpanWidth(this.state.id) });
    });
  };

  render() {
    const {
      inputName,
      inputRef,
      inputPlaceholder,
      inputValue,
      isDragging,
    } = this.props;
    return (
      <>
        <DynamicInput
          type="text"
          width={this.state.width}
          ref={inputRef}
          isDragging={isDragging}
          name={inputName}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={this._handleUpdate}
        />
        <Span id={this.state.id}>{this.state.value}</Span>
      </>
    );
  }
}

const DynamicInput = styled.input`
  border: none;
  outline: none;
  background-color: white;
  font-size: 14px;
  font-family: Alata;
  width: ${(props) => props.width};
  max-width: 100%;
  background-color: ${(props) => (props.isDragging ? "white" : "transparent")};
`;

const Span = styled.span`
  white-space: pre;
  position: absolute;
  left: -9999px;
  top: -9999px;
`;
