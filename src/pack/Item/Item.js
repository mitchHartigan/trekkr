import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./_item.scss";
import { ItemContainer } from "./Item.elem";
import { StylesProvider } from "@material-ui/core";
import { Input, InputLabel, Select, MenuItem } from "@material-ui/core";
import DynamicTextInput from "./DynamicTextInput.elem";
import DeleteIcon from "../../delete-button.svg";
import styled from "styled-components";

// Looks like we can re-write this as a styled component...let's look into it.
const DeleteButton = (props) => {
  if (props.display) {
    return (
      <button className="item__deleteButton" onClick={props.handleDelete}>
        <img src={DeleteIcon} width="25" height="25" />
      </button>
    );
  } else {
    return (
      <button
        className="item__deleteButton--hidden"
        onClick={props.handleDelete}
      >
        <img src={DeleteIcon} width="25" height="25" />
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

  // componentDidMount() {
  //   this.nameInput.current.focus();
  // }

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
                <DynamicTextInput
                  fontSize="14"
                  fontFamily="Alata"
                  inputRef={this.nameInput}
                  inputName="name"
                  inputPlaceholder="Name"
                  inputValue={name ? name : ""}
                  handleUpdate={this.handleUpdate}
                />
              </NameInputContainer>

              <div>
                <Input
                  className="item__weightInput"
                  ref={this.weightInput}
                  name="weight"
                  type="number"
                  value={weight}
                  placeholder="0"
                  onChange={this.handleUpdate}
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
              </div>

              <div className="item__qtyContainer">
                <InputLabel className="item__qtyLabel">x</InputLabel>
                <Input
                  className="item__qtyInput"
                  ref={this.qtyInput}
                  type="number"
                  value={qty}
                  name="qty"
                  placeholder="1"
                  onChange={this.handleUpdate}
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

// const ItemInput = styled.input`
//   border: none;
//   outline: none;
//   background-color: white;
//   font-size: 14px;
//   font-family: Alata;
// `;

const NameInputContainer = styled.div`
  width: 25vw;
`;
