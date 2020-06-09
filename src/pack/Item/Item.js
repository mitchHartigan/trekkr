import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./_item.scss";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      weight: 0,
      qty: 1
    };
  }

  handleUpdate = evt => {
    this.props.updateItemContents(
      this.props.item.id,
      evt.target.name,
      evt.target.value
    );
  };

  render() {
    const { name, weight, qty } = this.props.item;
    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <section
            className="item"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder={"Name"}
                value={name}
                onChange={this.handleUpdate}
              />
            </div>

            <div>
              <input
                name="weight"
                type="number"
                value={weight}
                placeholder="0"
                onChange={this.handleUpdate}
              />
              <select name="units">
                <option value="g">g</option>
                <option value="kg">kg</option>
              </select>
            </div>

            <div>
              <p>Qty</p>
              <input
                type="number"
                value={qty}
                name="qty"
                placeholder="1"
                onChange={this.handleUpdate}
              />
            </div>
          </section>
        )}
      </Draggable>
    );
  }
}
