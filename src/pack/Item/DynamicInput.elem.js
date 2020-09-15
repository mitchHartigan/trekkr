import React, { Component } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { getWidthOfText } from "../BackpackData/utils";
import PropTypes from "prop-types";

export default class DynamicInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      width: "",
      minWidth: "",
      id: null,
      isHovered: false,
    };
  }

  componentDidMount() {
    const id = uuidv4();
    // Uses the width of the placeholder text as the minimum allowed
    // width of the input elem, or 15px (whichever is larger).
    let minWidth = getWidthOfText(
      this.props.inputPlaceholder,
      this.props.fontSize,
      this.props.fontFamily
    );

    if (minWidth < 20) minWidth = 20;

    this.setState(
      { id: id, value: this.props.inputValue, minWidth: minWidth },
      () => {
        this.setState({ width: this._getSpanWidth(id) });
      }
    );
  }

  // TODO: refactor to use a ref instead of document.getELementById.
  _getSpanWidth = (id) => {
    let width = document.getElementById(id).offsetWidth * 1.05;
    if (width < this.state.minWidth) width = this.state.minWidth;

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

  _handleHover = (isHovered) => {
    this.setState({ isHovered: isHovered });
  };

  render() {
    const {
      inputName,
      inputRef,
      inputPlaceholder,
      inputValue,
      inputType,
      isDragging,
      fontFamily,
      fontSize,
      textAlign,
      inputStyles,
      containerStyles,
    } = this.props;

    return (
      <>
        <Container containerStyles={containerStyles}>
          <Input
            type={inputType}
            width={this.state.width}
            ref={inputRef}
            isDragging={isDragging}
            name={inputName}
            placeholder={inputPlaceholder}
            value={inputValue}
            fontFamily={fontFamily}
            fontSize={fontSize}
            textAlign={textAlign}
            onChange={this._handleUpdate}
            onMouseOver={() => this.setState({ hovered: true })}
            onMouseLeave={() => this.setState({ hovered: false })}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            inputStyles={inputStyles}
          />
          <Underline
            isHovered={this.state.hovered}
            isFocused={this.state.focused}
            width={this.state.width}
          ></Underline>
        </Container>

        <MeasurementSpan
          id={this.state.id}
          fontFamily={fontFamily}
          fontSize={fontSize}
        >
          {this.state.value}
        </MeasurementSpan>
      </>
    );
  }
}

DynamicInput.propTypes = {
  inputRef: PropTypes.object,
  inputPlaceholder: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.any.isRequired,
  inputType: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
  handleUpdate: PropTypes.func.isRequired,
  inputStyles: PropTypes.string,
  containerStyles: PropTypes.string,
};

const Input = styled.input`
  border: none;
  outline: none;
  background-color: white;
  font-size: ${(props) => props.fontSize}px;
  font-family: ${(props) => props.fontFamily};
  text-align: ${(props) => props.textAlign};
  width: ${(props) => props.width};
  max-width: 100%;
  background-color: ${(props) => (props.isDragging ? "white" : "transparent")};
  flex-grow: 0;
  flex-shrink: 0;
  ${(props) => props.inputStyles}
`;

const MeasurementSpan = styled.span`
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize}px;
  position: absolute;
  left: -9999px;
  top: -9999px;
`;

const Underline = styled.span`
  opacity: ${(props) => (props.isFocused || props.isHovered ? "1" : "0")};
  background-color: ${(props) => (props.isFocused ? "green" : "black")};
  width: ${(props) => props.width};
  height: 2px;
  color: red;
  transition: opacity 100ms ease;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 5px 0px 5px;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;
  ${(props) => props.containerStyles}
`;
