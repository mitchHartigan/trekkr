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
  handleUpdateCategoryTitle,
  handleDeleteCategory,
} from "./utils";
import { parseDataForVis } from "./utils";
import styled, { keyframes } from "styled-components";
import Vis from "../../vis/index";

export default class BackpackData extends Component {
  constructor(props) {
    super(props);

    this.state = data;
  }

  componentDidMount() {
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

  updateCategoryTitle = (id, title) => {
    this.setState(handleUpdateCategoryTitle(id, title, this.state));
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
                  id={category.id}
                  category={category}
                  items={items}
                  updateItemContents={this.updateItemContents}
                  addItem={this.addItem}
                  deleteItem={this.deleteItem}
                  deleteCategory={this.deleteCategory}
                  updateCategoryTitle={this.updateCategoryTitle}
                />
              );
            })}
            <button style={{ marginTop: "15px" }} onClick={this.addCategory}>
              + Add a category
            </button>
          </div>
        </DragDropContext>

        <VisContainer>
          <Vis data={parseDataForVis(this.state)} />
        </VisContainer>
      </div>
    );
  }
}

const visAnimation = keyframes`
  from {
    width: 0vw;
  }
  to {
    width: auto;
  }
`;

const VisContainer = styled.div`
  position: fixed;
  margin-left: 51vw;
  margin-top: 3vh;
  animation: ${visAnimation} 2s ease;
`;
