const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Water Filter" },
    "task-2": { id: "task-2", content: "Nalgene Bottle" },
    "task-3": { id: "task-3", content: "Emergency tablets" },
    "task-4": { id: "task-4", content: "Portable Stove" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Water",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "Cooking",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "First Aid",
      taskIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default initialData;
