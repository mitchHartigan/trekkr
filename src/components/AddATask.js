import React, { Component } from "react";
import styled from "styled-components";
import TaskInputElem from "./TaskInputElem";

const Button = styled.button`
  margin: 8px 8px 8px 8px;
  border: 2px solid #415a77;
  border-radius: 0px;
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.isDraggingOver ? "red" : "#415a77")};
  color: white;
  box-sizing: border-box;
  &: hover {
    box-shadow: 2px 2px 2px #2e3843;
    transition: background-color 0.1s ease;
    transition: color 0.06s ease-out;
    transition: box-shadow 0.1s ease-out;
  }
  font-size: 14pt;
  font-family: Open Sans Condensed;
`;

export default class AddATask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnteringData: false,
    };
  }

  toggleEnteringData = () => {
    this.setState({ isEnteringData: !this.state.isEnteringData });
  };

  render() {
    if (!this.state.isEnteringData) {
      return <Button onClick={this.toggleEnteringData}>+ Add a task</Button>;
    }
    return <TaskInputElem />;
  }
}
