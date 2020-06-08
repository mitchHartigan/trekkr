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
      <>
        <input
          type="text"
          value={this.state.title}
          onChange={this.updateTitle}
        />
        <Droppable droppableId={this.props.category.id}>
          {(provided, snapshot) => (
            <table>
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {this.props.items.map((item, index) => {
                  return (
                    <Item
                      key={item.id}
                      index={index}
                      name={item.name}
                      weight={item.weight}
                      qty={item.qty}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </Droppable>
      </>
    );
  }
}
