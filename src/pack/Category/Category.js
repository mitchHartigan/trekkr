import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Item from "../Item/Item";
import { AddANewItemButton, CategoryContainer } from "./Category.elem";
import { StylesProvider } from "@material-ui/core";
import "./_category.scss";
import { CategoryColor } from "./CategoryColor.elem";
import { NameInput } from "./NameInput.elem";
import DynamicInput from "../Item/DynamicInput.elem";
import styled from "styled-components";
export default class Category extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.state = {
      collapsed: false,
    };
  }

  // TODO: refactor controls/heading of the category out into its own component.
  // Yeah man, this file is wayy too big.

  handleDelete = () => {
    this.props.deleteCategory(this.props.category.id);
  };

  updateTitle = (evt) => {
    this.props.updateCategoryTitle(this.props.id, evt.target.value);
  };

  handleAddItem = () => {
    this.props.addItem(this.props.category);
  };

  render() {
    const { collapsed } = this.state;
    return (
      <StylesProvider injectFirst>
        <Droppable droppableId={this.props.category.id}>
          {(provided, snapshot) => (
            <CategoryContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <CategoryControlsContainer id="asdf">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CategoryColor color={this.props.category.color} />
                  <NameInputContainer>
                    <DynamicInput
                      inputType="text"
                      fontSize="20"
                      fontFamily="Alata"
                      textAlign="left"
                      inputRef={this.nameInput}
                      inputName="categoryName"
                      inputPlaceholder={"Category Title"}
                      inputValue={this.props.category.title || ""}
                      handleUpdate={this.updateTitle}
                      containerStyles={`margin: 10px; width: 25vw`}
                    />
                  </NameInputContainer>
                </div>

                <CollapseButton
                  onClick={() =>
                    this.setState({ collapsed: !this.state.collapsed })
                  }
                  collapsed={this.state.collapsed}
                >
                  <img src="collapse-button.png" alt="" />
                </CollapseButton>

                <DeleteButton onClick={this.handleDelete} show={!collapsed}>
                  X
                </DeleteButton>
              </CategoryControlsContainer>
              <ItemsContainer show={!collapsed}>
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

                <AddANewItemButton
                  onClick={this.handleAddItem}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  + Add an item
                </AddANewItemButton>
              </ItemsContainer>
            </CategoryContainer>
          )}
        </Droppable>
      </StylesProvider>
    );
  }
}

const CollapseButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  background: transparent;
  transform: ${(props) => (props.collapsed ? "rotate(-180deg)" : "")};
  transform-origin: center;
  transition: transform 150ms;
  flex-shrink: 0;
`;

const DeleteButton = styled.button`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  font-family: Alata;
  padding-right: 25px;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const ItemsContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
`;

const CategoryWeightSum = styled.p`
  font-family: Alata;
  font-size: 14px;
`;

const NameInputContainer = styled.div`
  width: 20vw;
`;

const CategoryControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
`;
