import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./_item.scss";
import { ItemContainer } from "./Item.elem";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //TODO: refactor as functional component
  }

  handleUpdate = evt => {
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
    const { name, weight, qty } = this.props.item;
    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <ItemContainer
            isDragging={snapshot.isDragging}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div>
              <input
                className="item__input"
                type="text"
                name="name"
                placeholder={"Name"}
                value={name}
                onChange={this.handleUpdate}
              />
            </div>

            <div>
              <input
                className="item__weightInput"
                name="weight"
                type="text"
                value={weight}
                placeholder="0"
                onChange={this.handleUpdate}
              />
              <select name="units">
                <option value="g">g</option>
                <option value="kg">kg</option>
              </select>
            </div>

            <div className="item__qty">
              <p>Qty</p>
              <input
                className="item__input"
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
    );
  }
}
