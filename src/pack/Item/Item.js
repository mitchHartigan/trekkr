import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./_item.scss";
import { ItemContainer } from "./Item.elem";
import { StylesProvider } from "@material-ui/core";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import DynamicInput from "./DynamicInput.elem";
import styled from "styled-components";

// TODO: refactor this as a styled component
const DeleteButton = (props) => {
  if (props.display) {
    return (
      <button className="item__deleteButton" onClick={props.handleDelete}>
        <img src="delete-button.png" />
      </button>
    );
  } else {
    return (
      <button
        className="item__deleteButton--hidden"
        onClick={props.handleDelete}
      >
        <img src="delete-button.png" />
      </button>
    );
  }
};

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
                  fontSize="14"
                  fontFamily="Alata"
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
                  fontSize="14"
                  fontFamily="Alata"
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

              <div className="item__qtyContainer">
                <InputLabel className="item__qtyLabel">x</InputLabel>
                <DynamicInput
                  inputType="number"
                  fontSize="14"
                  fontFamily="Alata"
                  textAlign="center"
                  inputRef={this.qtyInput}
                  inputName="qty"
                  inputPlaceholder="1"
                  inputValue={qty}
                  handleUpdate={this.handleUpdate}
                />
              </div>

              <div>
                <DeleteButton
                  handleDelete={this.handleDelete}
                  display={this.state.hovered}
                />
              </div>
            </ItemContainer>
          )}
        </Draggable>
      </StylesProvider>
    );
  }
}

const WeightInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NameInputContainer = styled.div`
  width: 25vw;
`;
