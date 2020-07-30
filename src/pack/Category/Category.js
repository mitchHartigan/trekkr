import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Item from "../Item/Item";
import { AddANewItemButton, CategoryContainer } from "./Category.elem";
import { Input, StylesProvider } from "@material-ui/core";
import "./_category.scss";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.category.title || "",
      // TODO: pass title state handling up to parent component
      isEmpty: false,
    };
  }

  handleDelete = () => {
    this.props.deleteCategory(this.props.category.id);
  };

  updateTitle = (evt) => {
    this.setState({ title: evt.target.value });
  };

  handleAddItem = () => {
    this.props.addItem(this.props.category);
  };

  render() {
    return (
      <StylesProvider injectFirst>
        <Droppable droppableId={this.props.category.id}>
          {(provided, snapshot) => (
            <CategoryContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Input
                  className="category__title"
                  type="text"
                  placeholder="Category Title"
                  value={this.state.title}
                  onChange={this.updateTitle}
                />

                {this.props.items.length == 0 && (
                  <button
                    className="category__deleteButton"
                    onClick={this.handleDelete}
                  >
                    X
                  </button>
                )}
              </div>

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
              <AddANewItemButton onClick={this.handleAddItem}>
                + Add an item
              </AddANewItemButton>
            </CategoryContainer>
          )}
        </Droppable>
      </StylesProvider>
    );
  }
}
