import React, { Component } from "react";
import Category from "../Category/Category";
import { DragDropContext } from "react-beautiful-dnd";
import { data } from "./data";
import { v4 as uuidv4 } from "uuid";
import { handleDrag } from "./utils";
export default class BackpackData extends Component {
  constructor(props) {
    super(props);

    this.state = data;
  }

  onDragEnd = result => {
    let updatedState = handleDrag(result, this.state);
    this.setState(updatedState);
  };

  updateItemContents = (itemId, key, value) => {
    const item = this.state.items[itemId];
    item[key] = value;

    let updatedState = {
      ...this.state,
      items: {
        ...this.state.items,
        [itemId]: item
      }
    };

    this.setState(updatedState, () => {
      console.log("this.state", this.state);
    });
  };

  addItem = category => {
    let uniqueId = uuidv4();
    const newItem = { id: uniqueId, name: "Name", weight: 0, qty: 1 };

    let updatedState = {
      ...this.state,
      items: {
        ...this.state.items,
        [uniqueId]: newItem
      }
      // categories[category].itemIds: {

      // }

      // * TODO * add item to category where button was clicked...
    };
    this.setState(updatedState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.categoryOrder.map(categoryId => {
          const category = this.state.categories[categoryId];
          const items = category.itemIds.map(
            itemId => this.state.items[itemId]
            // get each item from the state
          );
          return (
            <Category
              key={category.id}
              category={category}
              items={items}
              updateItemContents={this.updateItemContents}
              addItem={this.addItem}
            />
          );
        })}
      </DragDropContext>
    );
  }
}
