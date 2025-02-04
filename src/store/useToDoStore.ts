import { create } from "zustand";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  editMode: boolean;
}

interface TodoStore {
  addMode: boolean;
  toggleAdd: () => void;
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
  toggleEditMode: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  removeTask: (id: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  addMode: false,
  toggleAdd: () =>
    set((state) => ({
      addMode: !state.addMode,
    })),
  tasks: [
    { id: 1, text: "Buy groceries", completed: true, editMode: false },
    { id: 2, text: "Finish project", completed: false, editMode: false },
    { id: 3, text: "Go for a run", completed: false, editMode: false },
  ],
  addTask: (text) =>
    set((state) => ({
      tasks: [
        { id: Date.now(), text, completed: false, editMode: false },
        ...state.tasks,
      ],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    })),
  toggleEditMode: (
    id, // <-- Toggles edit mode for a specific task
  ) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, editMode: !task.editMode } : task,
      ),
    })),
  editTask: (
    id,
    newText, // <-- Edits the task text
  ) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, text: newText, editMode: false } : task,
      ),
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
