import React, { Component } from "react";
import Category from "../Category/Category";
import { DragDropContext } from "react-beautiful-dnd";
import { data } from "./data";
import { handleDrag, handleAddItem, handleDeleteItem } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { throwStatement } from "@babel/types";
export default class BackpackData extends Component {
  constructor(props) {
    super(props);

    this.state = data;
  }

  handleDrag = result => {
    this.setState(handleDrag(result, this.state));
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
    this.setState(handleAddItem(category, this.state));
  };

  addCategory = () => {
    const categoryId = uuidv4();

    const newCategory = {
      id: categoryId,
      title: "Category Name",
      itemIds: []
    };

    const updatedCategoryOrder = this.state.categoryOrder;
    updatedCategoryOrder.push(categoryId);

    const updatedState = {
      ...this.state,
      categories: {
        ...this.state.categories,
        [categoryId]: newCategory
      },
      categoryOrder: updatedCategoryOrder
    };

    this.setState(updatedState);
  };

  deleteItem = (item, category) => {
    this.setState(handleDeleteItem(item, category, this.state));
  };

  render() {
    return (
      <>
        <DragDropContext onDragEnd={this.handleDrag}>
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
        <button onClick={this.addCategory}>+ Add a category</button>
      </>
    );
  }
}
