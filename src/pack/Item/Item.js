import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./_item.scss";
import { ItemContainer } from "./Item.elem";
import { StylesProvider } from "@material-ui/core";
import { Input, InputLabel, Select, MenuItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteButton = (props) => {
  if (props.display) {
    return (
      <button className="item__deleteButton" onClick={props.handleDelete}>
        <DeleteIcon />
      </button>
    );
  } else {
    return (
      <button
        className="item__deleteButton--hidden"
        onClick={props.handleDelete}
      >
        <DeleteIcon />
      </button>
    );
  }
};

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
    //TODO: refactor as functional component
    this.nameInput = React.createRef();
    this.weightInput = React.createRef();
    this.qtyInput = React.createRef();
  }

  handleUpdate = (evt) => {
    this.props.updateItemContents(
      this.props.item.id,
      evt.target.name,
      evt.target.value
    );
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
              onMouseEnter={() => {
                this.setState({ hovered: true });
              }}
              onMouseLeave={() => {
                this.setState({ hovered: false });
              }}
            >
              <div>
                <Input
                  className="item__input"
                  ref={this.nameInput}
                  isDragging={snapshot.isDragging}
                  style={
                    snapshot.isDragging
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "transparent" }
                  }
                  type="text"
                  name="name"
                  placeholder={"Name"}
                  value={name}
                  onChange={this.handleUpdate}
                />
              </div>

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
                  defaultValue={units || "g"}
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
