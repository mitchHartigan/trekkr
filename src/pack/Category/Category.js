import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Item from "../Item/Item";
import {
  CategoryContainer,
  CategoryTitle,
  AddANewItemButton
} from "./Category.elem";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.category.title || ""
      // TODO: pass title state handling up to parent component
    };
  }

  updateTitle = evt => {
    this.setState({ title: evt.target.value });
  };

  handleAddItem = () => {
    this.props.addItem(this.props.category);
  };

  render() {
    return (
      <div>
        <CategoryTitle
          type="text"
          placeholder="Category Title"
          value={this.state.title}
          onChange={this.updateTitle}
        />
        <Droppable droppableId={this.props.category.id}>
          {(provided, snapshot) => (
            <CategoryContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
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
            </CategoryContainer>
          )}
        </Droppable>
        <AddANewItemButton onClick={this.handleAddItem}>
          + Add an item
        </AddANewItemButton>
      </div>
    );
  }
}
