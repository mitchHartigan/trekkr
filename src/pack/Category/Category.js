import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Item from "../Item/Item";
import { AddANewItemButton, CategoryContainer } from "./Category.elem";
import { StylesProvider } from "@material-ui/core";
import "./_category.scss";
import { CategoryColor } from "./CategoryColor.elem";
import { NameInput } from "./NameInput.elem";
export default class Category extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.category.firstTimeLoaded) {
      this.nameInput.current.focus();
    }
  }

  handleDelete = () => {
    this.props.deleteCategory(this.props.category.id);
  };

  updateTitle = evt => {
    this.props.updateCategoryTitle(this.props.id, evt.target.value);
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
                  justifyContent: "space-between"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <CategoryColor color={this.props.category.color} />

                  <NameInput
                    id={"nameinputbby"}
                    ref={this.nameInput}
                    type="text"
                    placeholder={"Category Title"}
                    value={this.props.category.title || ""}
                    onChange={this.updateTitle}
                  />
                </div>
                {this.props.items.length === 0 && (
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
              <AddANewItemButton
                onClick={this.handleAddItem}
                isDraggingOver={snapshot.isDraggingOver}
              >
                + Add an item
              </AddANewItemButton>
            </CategoryContainer>
          )}
        </Droppable>
      </StylesProvider>
    );
  }
}
