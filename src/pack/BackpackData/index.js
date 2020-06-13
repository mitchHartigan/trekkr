import React, { Component } from "react";
import Category from "../Category/Category";
import { DragDropContext } from "react-beautiful-dnd";
import { data } from "./data";
import {
  handleDrag,
  handleAddItem,
  handleAddCategory,
  handleDeleteItem,
  handleUpdateItem
} from "./utils";

export default class BackpackData extends Component {
  constructor(props) {
    super(props);

    this.state = data;
  }

  saveStateToLocalStorage = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  componentWillMount() {
    const localState = JSON.parse(localStorage.getItem("state"));

    if (localState) {
      this.setState(localState);
    }
  }

  handleDrag = result => {
    this.setState(handleDrag(result, this.state), () => {
      this.saveStateToLocalStorage();
    });
  };

  updateItemContents = (itemId, key, value) => {
    this.setState(handleUpdateItem(itemId, key, value, this.state), () => {
      this.saveStateToLocalStorage();
    });
  };

  addItem = category => {
    this.setState(handleAddItem(category, this.state), () => {
      this.saveStateToLocalStorage();
    });
  };

  addCategory = () => {
    this.setState(handleAddCategory(this.state), () => {
      this.saveStateToLocalStorage();
    });
  };

  deleteItem = (item, category) => {
    this.setState(handleDeleteItem(item, category, this.state), () => {
      this.saveStateToLocalStorage();
    });
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
        <div id="chart"></div>
      </>
    );
  }
}
