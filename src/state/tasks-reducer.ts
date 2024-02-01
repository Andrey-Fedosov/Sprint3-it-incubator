import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { TaskType } from "../Todolist";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";

type actionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  id: string;
  todolistId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  isDone: boolean;
  todolistId: string;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todolistId: string;
};

export const tasksReducer = (
  state: TasksStateType,
  action: actionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      // {
      //   const stateCopy = { ...state };
      //   const tasks = stateCopy[action.todolistId];
      //   const fTasks = tasks.filter((t) => t.id !== action.id);
      //   stateCopy[action.todolistId] = fTasks;
      //   return stateCopy;
      // }
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.id
        ),
      };
    case "ADD-TASK": {
      // const stateCopy = { ...state };
      // const tasks = stateCopy[action.todolistId];
      let newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      //       const newTasks = [newTask, ...tasks];
      //
      //       stateCopy[action.todolistId] = newTasks;
      //       return stateCopy;

      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };
    }
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, isDone: action.isDone } : t
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.title } : t
        ),
      };
    case "ADD-TODOLIST": {
      return { ...state, [action.todolistId]: (state[action.todolistId] = []) };
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      throw new Error("I dont understand this type");
  }
};

export const removeTaskAC = (
  id: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", id: id, todolistId: todolistId } as const;
};

export const addTaskAC = (
  todolistId: string,
  title: string
): AddTaskActionType => {
  return { type: "ADD-TASK", todolistId: todolistId, title: title } as const;
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId } as const;
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", taskId, title, todolistId } as const;
};
