import React, { Component } from "react";
import Category from "../Category/Category";
import { DragDropContext } from "react-beautiful-dnd";
import { data } from "./data";
import {
  handleDrag,
  handleAddItem,
  handleAddCategory,
  handleDeleteItem,
  handleUpdateItem,
  handleDeleteCategory,
} from "./utils";
import { parseDataForVis } from "./utils";
import Vis from "../../vis/index";

export default class BackpackData extends Component {
  constructor(props) {
    super(props);

    this.state = data;
  }

  componentWillMount() {
    const localState = JSON.parse(localStorage.getItem("state"));

    if (localState) {
      this.setState(localState);
    }

    window.onbeforeunload = () => {
      localStorage.setItem("state", JSON.stringify(this.state));
    };
  }

  handleDrag = (result) => {
    this.setState(handleDrag(result, this.state));
  };

  updateItemContents = (itemId, key, value) => {
    this.setState(handleUpdateItem(itemId, key, value, this.state));
  };

  addItem = (category) => {
    this.setState(handleAddItem(category, this.state));
  };

  addCategory = () => {
    this.setState(handleAddCategory(this.state));
  };

  deleteItem = (item, category) => {
    this.setState(handleDeleteItem(item, category, this.state));
  };

  deleteCategory = (id) => {
    this.setState(handleDeleteCategory(id, this.state));
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <DragDropContext onDragEnd={this.handleDrag}>
          <div
            style={{ width: "50vw", display: "flex", flexDirection: "column" }}
          >
            {this.state.categoryOrder.map((categoryId) => {
              const category = this.state.categories[categoryId];
              const items = category.itemIds.map(
                (itemId) => this.state.items[itemId]
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
                  deleteCategory={this.deleteCategory}
                />
              );
            })}
            <button onClick={this.addCategory}>+ Add a category</button>
          </div>
        </DragDropContext>
        <div
          style={{ position: "fixed", marginLeft: "50vw", marginTop: "4vh" }}
        >
          <Vis data={parseDataForVis(this.state)} />
        </div>
      </div>
    );
  }
}
