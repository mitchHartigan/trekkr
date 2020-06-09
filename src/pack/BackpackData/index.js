import React, { Component } from "react";
import Category from "../Category/Category";
import { DragDropContext } from "react-beautiful-dnd";
import { data } from "./data";
import { handleDrag, handleAddItem } from "./utils";
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
    this.setState(updatedState);
  };

  addItem = category => {
    let updatedState = handleAddItem(category, this.state);
    this.setState(updatedState);
  };

  deleteItem = (item, category) => {
    const updatedItems = this.state.items;
    delete updatedItems[item.id];

    let updatedItemIds = this.state.categories[category.id].itemIds;

    const index = updatedItemIds.indexOf(item.id);
    updatedItemIds.splice(index, 1);

    const updatedState = {
      ...this.state,
      items: {
        ...updatedItems
      },
      categories: {
        ...this.state.categories,
        [category.id]: {
          ...this.state.categories[category.id],
          itemIds: updatedItemIds
        }
      }
    };

    console.log("updatedState", updatedState);

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
              deleteItem={this.deleteItem}
            />
          );
        })}
      </DragDropContext>
    );
  }
}
