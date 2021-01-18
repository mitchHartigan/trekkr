import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./_item.scss";
import { ItemContainer } from "./Item.elem";
import { StylesProvider } from "@material-ui/core";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import DynamicInput from "./DynamicInput.elem";
import styled from "styled-components";
import InputLabel from "./_inputLabel";
export default class Item extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();

    this.state = {
      hovered: false,
    };
  }

  componentDidMount() {
    this.nameInput.current.focus();
  }

  handleUpdate = (evt) => {
    this.props.updateItemContents(
      this.props.item.id,
      evt.target.name,
      evt.target.value
    );
  };

  handleFocusToggle = (evt) => {
    if (evt.keyCode === 13) {
      this.nameInput.current.blur();
    }
  };

  handleDelete = () => {
    this.props.deleteItem(this.props.item, this.props.category);
  };

  render() {
    const { name, weight, qty, units } = this.props.item;

    return (
      <StylesProvider>
        <Draggable draggableId={this.props.item.id} index={this.props.index}>
          {(provided, snapshot) => (
            <ItemContainer
              isDragging={snapshot.isDragging}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onMouseOver={() => {
                this.setState({ hovered: true });
              }}
              onMouseLeave={() => {
                this.setState({ hovered: false });
              }}
            >
              <NameInputContainer>
                <DynamicInput
                  inputType="text"
                  inputRef={this.nameInput}
                  inputName="name"
                  inputPlaceholder="Name"
                  inputValue={name ? name : ""}
                  handleUpdate={this.handleUpdate}
                />
              </NameInputContainer>

              <WeightInputContainer>
                <DynamicInput
                  inputType="number"
                  textAlign="center"
                  inputRef={this.weightInput}
                  inputName="weight"
                  inputPlaceholder="0"
                  inputValue={weight}
                  handleUpdate={this.handleUpdate}
                />
                <Select
                  name="units"
                  className="item__select"
                  value={units || "g"}
                  onChange={this.handleUpdate}
                >
                  <MenuItem value="g">g</MenuItem>
                  <MenuItem value="kg">kg</MenuItem>
                </Select>
              </WeightInputContainer>

              <QuantityContainer>
                <InputLabel className="item__qtyLabel">x</InputLabel>
                <DynamicInput
                  inputType="number"
                  textAlign="center"
                  inputRef={this.qtyInput}
                  inputName="qty"
                  inputPlaceholder="1"
                  inputValue={qty}
                  handleUpdate={this.handleUpdate}
                />
              </QuantityContainer>

              <div>
                <DeleteButton
                  onClick={this.handleDelete}
                  display={this.state.hovered}
                >
                  <img src="delete-button.png" />
                </DeleteButton>
              </div>
            </ItemContainer>
          )}
        </Draggable>
      </StylesProvider>
    );
  }
}

const DeleteButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  opacity: 0.5;
  padding-right: 16px;
  &:hover {
    opacity: 1;
  }
  visibility: ${(props) => (props.display ? "visible" : "hidden")};
`;

const WeightInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const QuantityContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  font-family: Alata;
  margin: 0px 5px 0px 15px;
`;

const NameInputContainer = styled.div`
  width: 25vw;
`;
