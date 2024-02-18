import { StateCreator, create } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { immer } from "zustand/middleware/immer";

interface TaskState {
  tasks: Record<string, Task>;
  getTaskByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (id: string) => void;
  draggingTaskId?: string;
  removeDraggingTaskId: () => void;
  changeProgress: (id: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  addTask: (title: string, status: TaskStatus) => void;
  computed: {
    totalTask: number;
  };
}

const storeApi: StateCreator<
  TaskState,
  [
    ["zustand/devtools", never],
    ["zustand/persist", unknown],
    ["zustand/immer", never]
  ],
  []
> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": {
      id: "ABC-1",
      title: "Task 1",

      status: "OPEN",
    },
    "ABC-2": {
      id: "ABC-2",
      title: "Task 2",

      status: "IN_PROGRESS",
    },
    "ABC-3": {
      id: "ABC-3",
      title: "Task 3",

      status: "IN_PROGRESS",
    },
    "ABC-4": {
      id: "ABC-4",
      title: "Task 4",

      status: "OPEN",
    },
    "ABC-5": {
      id: "ABC-5",
      title: "Task 5",

      status: "DONE",
    },
  },

  computed: {
    get totalTask(): number {
      return (
        Object.values(get().tasks).filter((task) => task.status === "OPEN")
          .length +
        Object.values(get().tasks).filter(
          (task) => task.status === "IN_PROGRESS"
        ).length +
        Object.values(get().tasks).filter((task) => task.status === "DONE")
          .length
      );
    },
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = Object.values(get().tasks);
    return tasks.filter((task) => task.status === status);
  },
  setDraggingTaskId: (id: string) => {
    set({ draggingTaskId: id });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeProgress: (taskId: string, status: TaskStatus) => {
    set((state) => {
      const task = state.tasks[taskId];
      if (task) {
        // Con immer, puedes mutar el estado directamente y él se encarga de hacer las modificaciones de forma inmutable
        task.status = status;
      }
    });
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeProgress(taskId, status);
    get().removeDraggingTaskId();
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      status,
    };

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(persist(immer(storeApi), { name: "task-store" }))
);
