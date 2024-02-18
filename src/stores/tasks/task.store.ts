import { StateCreator, create } from "zustand";
import { Task } from "../../interfaces";

interface TaskState {
  tasks: Record<string, Task>;
}
const storeApi: StateCreator<TaskState> = (set) => ({
  tasks: {
    "ABC-1": {
      id: "ABC-1",
      title: "Task 1",
      description: "This is task 1",
      status: "OPEN",
    },
    "ABC-2": {
      id: "ABC-2",
      title: "Task 2",
      description: "This is task 2",
      status: "IN_PROGRESS",
    },
    "ABC-3": {
      id: "ABC-3",
      title: "Task 3",
      description: "This is task 3",
      status: "DONE",
    },
    "ABC-4": {
      id: "ABC-4",
      title: "Task 4",
      description: "This is task 4",
      status: "OPEN",
    },
  },
});

export const useTaskStore = create<TaskState>()(storeApi);
