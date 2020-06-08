import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Item from "../Item/Item";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.category.title || "Category Title"
    };
  }

  updateTitle = evt => {
    this.setState({ title: evt.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.title}
          onChange={this.updateTitle}
        />
        <Droppable droppableId={this.props.category.id}>
          {(provided, snapshot) => (
            <section ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.items.map((item, index) => {
                return (
                  <Item
                    key={item.id}
                    index={index}
                    item={item}
                    name={item.name}
                    weight={item.weight}
                    qty={item.qty}
                  ></Item>
                );
              })}
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </div>
    );
  }
}
