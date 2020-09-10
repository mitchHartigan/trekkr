import { v4 as uuidv4 } from "uuid";
import tinycolor from "tinycolor2";

export const getWidthOfText = (text, fontSize, fontFamily) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font = `${fontSize}px ${fontFamily}`;
  const width = Math.floor(context.measureText(text).width);

  return width;
};

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
      itemIds: newItemIds,
    };

    const updatedState = {
      ...currentState,
      categories: {
        ...currentState.categories,
        [updatedCategory.id]: updatedCategory,
      },
    };

    return updatedState; //this makes sure we don't execute the code below.
  }

  // moving from one category to another
  const startItemIds = Array.from(start.itemIds);
  startItemIds.splice(source.index, 1);
  // remove the element from the old list

  const updatedStart = {
    ...start,
    itemIds: startItemIds,
  };

  const finishItemIds = Array.from(finish.itemIds);
  finishItemIds.splice(destination.index, 0, draggableId);

  const updatedFinish = {
    ...finish,
    itemIds: finishItemIds,
  };

  const updatedState = {
    ...currentState,
    categories: {
      ...currentState.categories,
      [updatedStart.id]: updatedStart,
      [updatedFinish.id]: updatedFinish,
    },
  };

  return updatedState;
};

export const handleAddItem = (category, currentState) => {
  let uniqueId = uuidv4();

  const newItem = {
    id: uniqueId,
    name: "",
    weight: 1,
    qty: 1,
    units: "g",
  };

  const updatedItemIds = currentState.categories[category.id].itemIds;

  updatedItemIds.push(uniqueId);

  let updatedState = {
    ...currentState,
    items: {
      ...currentState.items,
      [uniqueId]: newItem,
    },
    categories: {
      ...currentState.categories,
      [category.id]: {
        ...currentState.categories[category.id],
        itemIds: updatedItemIds,
      },
    },
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
      ...updatedItems,
    },
    categories: {
      ...currentState.categories,
      [category.id]: {
        ...currentState.categories[category.id],
        itemIds: updatedItemIds,
      },
    },
  };
  return updatedState;
};

export const generateCategoryColor = (seedColor) => {
  const analogousColors = tinycolor(seedColor).analogous();

  return analogousColors;
};

export const handleAddCategory = (currentState) => {
  const categoryId = uuidv4();

  const newCategory = {
    id: categoryId,
    firstTimeLoaded: true,
    title: "",
    itemIds: [],
    color: selectColorForCategory(currentState),
  };

  const updatedCategoryOrder = currentState.categoryOrder;

  updatedCategoryOrder.push(categoryId);

  const updatedState = {
    ...currentState,
    categories: {
      ...currentState.categories,
      [categoryId]: newCategory,
    },
    categoryOrder: updatedCategoryOrder,
  };
  return updatedState;
};

export const handleUpdateItem = (itemId, key, value, currentState) => {
  // checks if value is from a number input (by attempting to convert to a number)
  // and then sets it to 0 if that number is a negative value.
  if (Number(value) !== NaN && Number(value) <= 0) {
    value = "";
  }

  const item = currentState.items[itemId];
  item[key] = value;

  let updatedState = {
    ...currentState,
    items: {
      ...currentState.items,
      [itemId]: item,
    },
  };
  return updatedState;
};

export const handleUpdateCategoryTitle = (categoryId, title, currentState) => {
  // currentState.categories[categoryId].title = title;
  const updatedState = {
    ...currentState,
    categories: {
      ...currentState.categories,
      [categoryId]: {
        ...currentState.categories[categoryId],
        title: title,
      },
    },
  };

  return updatedState;
};

/* This function is a monolith...need to refactor it out into it's own file, maybe
  it's own module or class or something, but wow she's a doozy. */
export const parseDataForVis = (initialData) => {
  let formattedCategories = [];

  const items = initialData.items;
  // { 'item-1': {id: 'item-1', name: 'Water Filter, weight: 200}...}

  let categoryKeys = Object.keys(initialData.categories);
  // [category-1, category-2, category-3]...

  categoryKeys.forEach((key) => {
    let initialCategory = initialData.categories[key];

    const formattedCategory = {
      title: initialCategory.title || "",
      style: {
        border: "none",
        margin: "0px",
      },
    };

    let formattedChildren = [];

    let allCategoryItemsWeight = [];

    initialCategory.itemIds.forEach((id) => {
      allCategoryItemsWeight.push(
        parseInt(
          convertWeightToGrams(items[id].weight, items[id].units) *
            items[id].qty
        )
      );
    });

    let largestWeightInCategory = findLargestWeight(allCategoryItemsWeight);

    initialCategory.itemIds.forEach((id) => {
      let currentItemWeight =
        convertWeightToGrams(items[id].weight, items[id].units) * items[id].qty;

      let backgroundColor = generateBackgroundColor(
        currentItemWeight,
        largestWeightInCategory,
        30,
        initialCategory.color || "yellow"
      );

      // JFC this is disgusting.
      // TODO: refactor this to be...not this.
      let formattedItem = {
        name: id,
        value: items[id].name,
        size: currentItemWeight,
        weightString: `${convertWeightToKilograms(
          currentItemWeight,
          items[id].units
        ).toString()} ${items[id].units}`,
        style: {
          backgroundColor: backgroundColor,
          border: "1px solid #f6f5f0",
        },
        baseColor: initialCategory.color,
      };
      formattedChildren.push(formattedItem);
    });

    formattedCategory.children = formattedChildren;
    formattedCategories.push(formattedCategory);
  });

  const formattedData = {
    title: "",
    style: {
      background: "none",
      border: "none",
      color: "none",
    },

    children: formattedCategories,
  };

  return formattedData;
};

export const handleDeleteCategory = (id, initialData) => {
  // remove category object stored in 'categories' object
  delete initialData.categories[id];

  // remove id of deleted category from categoryOrder object.
  initialData.categoryOrder.splice(initialData.categoryOrder.indexOf(id), 1);

  return initialData;
};

export const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export const generateBackgroundColor = (
  currentWeightValue,
  maxWeightValue,
  maxLightenValue,
  currentColor
) => {
  const invertedLightenValue = scale(
    currentWeightValue,
    1,
    maxWeightValue,
    1,
    maxLightenValue
  );

  const mappedLightenValue =
    maxLightenValue -
    maxLightenValue * (invertedLightenValue / maxLightenValue);

  return tinycolor(currentColor).saturate(10).lighten(mappedLightenValue);
};

export const findLargestWeight = (itemArray) => {
  return Math.max(...itemArray);
};

export const selectColorForCategory = (currentState) => {
  const getRandomValueInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  let colors = [
    "rgb(197, 172, 129)",
    "rgb(221, 96, 49)",
    "rgb(243, 201, 105)",
    "rgb(4, 67, 137)",
    "rgb(103, 148, 54)",
  ];

  let alreadyUsedColors = [];

  Object.keys(currentState.categories).forEach((key) => {
    let categoryColor = currentState.categories[key].color;
    if (categoryColor) {
      alreadyUsedColors.push(categoryColor);
    }
  });

  // Remove the colors already in use from the colors array.
  alreadyUsedColors.forEach((color) => {
    let colorIndex = colors.indexOf(color);

    if (colorIndex !== -1) {
      colors.splice(colorIndex, 1);
    }
  });

  const selectedColor = colors[getRandomValueInRange(0, colors.length)];

  return selectedColor;
};

// The graph should always function in grams, as it is the easiest base weight value to work with for
// the d3 flare dataset.
export const convertWeightToGrams = (weight, units) => {
  if (units === "kg") {
    const convertedWeight = weight * 1000;
    return convertedWeight;
  }
  return weight;
};

// Takes the data from the treemap dataset and converts it back to whichever unit is displayed on the item.
// Since we're only using metric at the moment, this will simply just convert back to kg (but should amend to work
// with the imperial units as well later)
export const convertWeightToKilograms = (weight, units) => {
  if (units === "kg") {
    const convertedWeight = weight / 1000;
    return convertedWeight;
  }
  return weight;
};
