import React, { Component } from "react";
import styled from "styled-components";
import CancelButton from "./CancelButton";

const AddATaskContainer = styled.div`
  width: 365px;
  padding: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const WeightInputContainer = styled(InputContainer)`
  padding-left: 5px;
  padding-right: 5px;
  align-items: flex-end;
`;

const NameInput = styled.input`
  width: 220px;
  height: 30px;
  padding-left: 4px;
  font-size: 16px;
  font-family: Open Sans Condensed;
`;

const WeightInput = styled(NameInput)`
  width: 40px;
`;

const WeightSelect = styled.select`
  width: 50px;
  height: 100%;
  font-family: Open Sans Condensed;
  font-size: 16px;
  margin-left: 5px;
`;

const Button = styled.button`
  margin: 8px 8px 8px 8px;
  border: 2px solid #415a77;
  border-radius: 0px;
  padding: 8px;
  cursor: pointer;
  color: white;
  &: hover {
    box-shadow: 2px 2px 2px #2e3843;
    transition: background-color 0.1s ease;
    transition: color 0.06s ease-out;
    transition: box-shadow 0.1s ease-out;
  }
  font-size: 14pt;
  font-family: Open Sans Condensed;
`;

const AddTaskButton = styled.button`
  height: 30px;
  font-family: Open Sans Condensed;
  font-size: 16px;
  width: 100%;
`;

export default class TaskInputElem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnteringInfo: false,
    };

    this.nameInput = React.createRef();
    this.weightInput = React.createRef();
  }

  handleBackButton = () => {};

  submitName = () => {
    let name = this.nameInput.current.value;
    console.log("name entered:", name);
    this.setState({ nameEntered: true, name: name });
  };

  render() {
    if (!this.state.isEnteringData) {
      return (
        <AddATaskContainer>
          <InputContainer>
            <NameInput />
            <WeightInputContainer>
              <WeightInput />
              <WeightSelect>
                <option>g</option>
              </WeightSelect>
            </WeightInputContainer>
          </InputContainer>

          <div>
            <CancelButton onClick={this.toggleInput} />
            <AddTaskButton>Add task</AddTaskButton>
          </div>
        </AddATaskContainer>
      );
    }
  }
}
