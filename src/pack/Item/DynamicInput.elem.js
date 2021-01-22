import React, { Component } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { getWidthOfText } from "../BackpackData/utils";
import PropTypes from "prop-types";

/* TODO: move this component outside of the Item directory, as it's acccessed by Category as well. */

export default class DynamicInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      width: "",
      minWidth: "",
      id: "",
      isHovered: false,
    };
  }

  async componentDidMount() {
    const id = uuidv4();
    const { inputValue, inputPlaceholder, fontFamily, fontSize } = this.props;

    const placeholderTextWidth = getWidthOfText(
      inputPlaceholder,
      fontSize,
      fontFamily
    );

    // set width to 20px if the width of the placeholder text is less than that
    const minWidth = placeholderTextWidth > 15 ? placeholderTextWidth : 15;

    this.setState(
      {
        id: id,
        value: inputValue,
        minWidth: minWidth,
      },
      () => {
        this.setState({ width: this._getInputWidth(inputValue) });
      }
    );
  }

  _getInputWidth = (text) => {
    const { minWidth } = this.state;
    const { fontSize, fontFamily } = this.props;

    let width = getWidthOfText(text, fontSize, fontFamily);
    if (width < minWidth) width = minWidth;

    return `${width}px`;
  };

  _handleUpdate = (evt) => {
    this.props.handleUpdate(evt);
    const value = evt.target.value;

    this.setState({ value: value, width: this._getInputWidth(value) });
  };

  _handleHover = (isHovered) => {
    this.setState({ isHovered: isHovered });
  };

  _handleFocus = (evt) => {
    this.setState({ focused: evt.type === "focus" ? true : false });
  };

  _handleKeyPress = (evt) => {
    if (evt.which === 13) {
      this.setState({ focused: false });
      this.props.inputRef.current.blur();
    }
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
            onFocus={this._handleFocus}
            onBlur={this._handleFocus}
            inputStyles={inputStyles}
            onKeyPress={this._handleKeyPress}
          />
          <Underline
            isHovered={this.state.hovered}
            isFocused={this.state.focused}
            width={this.state.width}
          ></Underline>
        </Container>
      </>
    );
  }
}

DynamicInput.defaultProps = {
  fontSize: "14",
  fontFamily: "Alata",
};

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

const Underline = styled.span`
  opacity: ${(props) => (props.isFocused || props.isHovered ? "1" : "0")};
  background-color: ${(props) => (props.isFocused ? "#708f00" : "black")};
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
