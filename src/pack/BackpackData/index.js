import React, { Component } from "react";
import Category from "../Category/Category";
import { DragDropContext } from "react-beautiful-dnd";
import { data } from "./exampleData";
import { defaultState } from "./defaultState";
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

    this.state = defaultState;
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

  checkVisWillRender = () => {
    if (Object.keys(this.state.items).length === 0) {
      return false;
    }
    return true;
  };

  render() {
    return (
      <DataContainer renderVis={this.checkVisWillRender()}>
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
            <AddANewItemButton onClick={this.addCategory}>
              + Add a category
            </AddANewItemButton>
          </div>
        </DragDropContext>

        {this.checkVisWillRender() && (
          <VisContainer>
            <Vis data={parseDataForVis(this.state)} />
          </VisContainer>
        )}
      </DataContainer>
    );
  }
}

const AddANewItemButton = styled.button`
  padding: 10px;
  margin: 28px 0px 10px 20px;
  text-align: center;
  border: 2px solid #7dab87;
  cursor: pointer;
  color: black;
  border-radius: 3px;
  &: hover {
    background-color: #7dab87;
    transition: background-color 50ms ease;
    color: white;
    transition: color 50ms ease;
    box-shadow: 3px 7px 10px #abb6a5;
    transition: box-shadow 30ms ease-out;
  }
  font-family: Alata;
  font-weight: 300;
  font-size: 14px;
`;
const visAnimation = keyframes`
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
`;

const VisContainer = styled.div`
  position: fixed;
  margin-left: 52vw;
  width: 10vw;
  margin-top: 3vh;
  animation: ${visAnimation} 0.5s ease;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: ${(props) => (props.renderVis ? "" : "center")};
  transition: justify-content 1s linear;
`;
