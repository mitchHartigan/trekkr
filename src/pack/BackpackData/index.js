import React, { Component } from "react";
import Category from "../Category/Category";
import { DragDropContext } from "react-beautiful-dnd";
import { data } from "./data";

export default class BackpackData extends Component {
  constructor(props) {
    super(props);

    this.state = data;
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      // user clicked on the element, but didn't drag it anywhere
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // user dragged the element, but put it back in it's original position
      return;
    }

    const start = this.state.categories[source.droppableId];
    const finish = this.state.categories[destination.droppableId];

    if (start === finish) {
      //item was dragged and dropped within the same category.

      const newItemIds = Array.from(start.itemIds);

      newItemIds.splice(source.index, 1);
      // remove the item from the old index position.
      newItemIds.splice(destination.index, 0, draggableId);
      // add the item at the new index position.

      const updatedCategory = {
        ...start,
        itemIds: newItemIds
      };

      const updatedState = {
        ...this.state,
        categories: {
          ...this.state.categories,
          [updatedCategory.id]: updatedCategory
        }
      };

      this.setState(updatedState);
      return; //this makes sure we don't execute the code below.
    }

    // moving from one category to another
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    // remove the element from the old list

    const updatedStart = {
      ...start,
      itemIds: startItemIds
    };

    const finishItemIds = Array.from(start.itemIds);
    finishItemIds.splice(destination.index, 0, draggableId);

    const updatedFinish = {
      ...finish,
      itemIds: finishItemIds
    };

    const updatedState = {
      ...this.state,
      categories: {
        ...this.state.categories,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish
      }
    };

    this.setState(updatedState);
    return;
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
            <Category key={category.id} category={category} items={items} />
          );
        })}
      </DragDropContext>
    );
  }
}
