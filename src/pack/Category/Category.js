import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Item from "../Item/Item";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.category.title || "Category Title"
      // TODO: pass title state handling up to parent component
    };
  }

  updateTitle = evt => {
    this.setState({ title: evt.target.value });
  };

  handleAddItem = () => {
    this.props.addItem(this.props.category);
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
                    category={this.props.category}
                    item={item}
                    updateItemContents={this.props.updateItemContents}
                    deleteItem={this.props.deleteItem}
                  />
                );
              })}
              {provided.placeholder}
            </section>
          )}
        </Droppable>
        <button onClick={this.handleAddItem}>+ Add item</button>
      </div>
    );
  }
}
