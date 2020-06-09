import { v4 as uuidv4 } from "uuid";

export const handleDrag = (result, currentState) => {
  const { destination, source, draggableId } = result;

  if (!destination) {
    // user clicked on the element, but didn't drag it anywhere
    return currentState;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    // user dragged the element, but put it back in it's original position
    return currentState;
  }

  const start = currentState.categories[source.droppableId];
  const finish = currentState.categories[destination.droppableId];

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
      ...currentState,
      categories: {
        ...currentState.categories,
        [updatedCategory.id]: updatedCategory
      }
    };

    return updatedState; //this makes sure we don't execute the code below.
  }

  // moving from one category to another
  const startItemIds = Array.from(start.itemIds);
  startItemIds.splice(source.index, 1);
  // remove the element from the old list

  const updatedStart = {
    ...start,
    itemIds: startItemIds
  };

  const finishItemIds = Array.from(finish.itemIds);
  finishItemIds.splice(destination.index, 0, draggableId);

  const updatedFinish = {
    ...finish,
    itemIds: finishItemIds
  };

  const updatedState = {
    ...currentState,
    categories: {
      ...currentState.categories,
      [updatedStart.id]: updatedStart,
      [updatedFinish.id]: updatedFinish
    }
  };

  return updatedState;
};

export const handleAddItem = (category, currentState) => {
  let uniqueId = uuidv4();
  const newItem = { id: uniqueId, name: "Name", weight: 0, qty: 1 };

  const updatedItemIds = currentState.categories[category.id].itemIds;

  updatedItemIds.push(uniqueId);

  let updatedState = {
    ...currentState,
    items: {
      ...currentState.items,
      [uniqueId]: newItem
    },
    categories: {
      ...currentState.categories,
      [category.id]: {
        ...currentState.categories[category.id],
        itemIds: updatedItemIds
      }
    }
  };
  return updatedState;
};

export const handleDeleteItem = (item, category, currentState) => {
  const updatedItems = currentState.items;
  delete updatedItems[item.id];

  let updatedItemIds = currentState.categories[category.id].itemIds;

  const index = updatedItemIds.indexOf(item.id);
  updatedItemIds.splice(index, 1);

  const updatedState = {
    ...currentState,
    items: {
      ...updatedItems
    },
    categories: {
      ...currentState.categories,
      [category.id]: {
        ...currentState.categories[category.id],
        itemIds: updatedItemIds
      }
    }
  };
  return updatedState;
};

export const handleAddCategory = currentState => {
  const categoryId = uuidv4();

  const newCategory = {
    id: categoryId,
    title: "",
    itemIds: []
  };

  const updatedCategoryOrder = currentState.categoryOrder;
  updatedCategoryOrder.push(categoryId);

  const updatedState = {
    ...currentState,
    categories: {
      ...currentState.categories,
      [categoryId]: newCategory
    },
    categoryOrder: updatedCategoryOrder
  };
  return updatedState;
};

export const handleUpdateItem = (itemId, key, value, currentState) => {
  const item = currentState.items[itemId];
  item[key] = value;

  let updatedState = {
    ...currentState,
    items: {
      ...currentState.items,
      [itemId]: item
    }
  };
  return updatedState;
};
