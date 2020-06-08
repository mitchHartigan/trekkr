export const data = {
  items: {
    "item-1": { id: "item-1", name: "Water Filter", weight: 200, qty: 1 },
    "item-2": { id: "item-2", name: "Water Filter", weight: 200, qty: 1 },
    "item-3": { id: "item-3", name: "Water Filter", weight: 200, qty: 1 },
    "item-4": { id: "item-4", name: "Water Filter", weight: 200, qty: 1 }
  },
  categories: {
    "category-1": {
      id: "category-1",
      title: "Water",
      itemIds: ["item-1", "item-2", "item-3", "item-4"]
    },
    "category-2": {
      id: "category-2",
      title: undefined,
      itemIds: []
    },
    "category-3": {
      id: "category-3",
      title: "First Aid",
      itemIds: []
    }
  },
  // just to have a list of all of the category ids, to map through.
  categoryOrder: ["category-1", "category-2", "category-3"]
};
