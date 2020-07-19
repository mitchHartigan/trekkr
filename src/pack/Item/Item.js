import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./_item.scss";
import { ItemContainer, ItemInput, ItemSelect } from "./Item.elem";
import { StylesProvider } from "@material-ui/core";
import { Input, InputLabel, Select, MenuItem } from "@material-ui/core";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //TODO: refactor as functional component
  }

  handleUpdate = (evt) => {
    this.props.updateItemContents(
      this.props.item.id,
      evt.target.name,
      evt.target.value
    );
  };

  handleDelete = () => {
    console.log("this.props.item", this.props.item);
    this.props.deleteItem(this.props.item, this.props.category);
  };

  render() {
    const { name, weight, qty, units } = this.props.item;
    return (
      <StylesProvider injectFirst>
        <Draggable draggableId={this.props.item.id} index={this.props.index}>
          {(provided, snapshot) => (
            <ItemContainer
              isDragging={snapshot.isDragging}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div>
                <Input
                  className="item__input"
                  isDragging={snapshot.isDragging}
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

              <div className="item__qty">
                <InputLabel id="qty">Qty</InputLabel>
                <Input
                  className="item__qtyInput"
                  type="number"
                  value={qty}
                  name="qty"
                  placeholder="1"
                  onChange={this.handleUpdate}
                />
              </div>

              <div>
                <button onClick={this.handleDelete}>Delete</button>
              </div>
            </ItemContainer>
          )}
        </Draggable>
      </StylesProvider>
    );
  }
}
