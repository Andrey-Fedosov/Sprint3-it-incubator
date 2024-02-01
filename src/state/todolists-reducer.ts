import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};
export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

export const todolistsReducer = (
  state: TodolistType[],
  action: actionsType
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);

    case "ADD-TODOLIST":
      const newTodolist: TodolistType = {
        id: action.todolistId,
        title: action.title,
        filter: "all",
      };
      return [...state, newTodolist];
    case "CHANGE-TODOLIST-TITLE":
      // const todolist = state.find((tl) => tl.id === action.id);
      // if (todolist) {
      //   todolist.title = action.title;
      // }
      // return [...state];
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );

    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    default:
      throw new Error("I don't  understand this type");
  }
};

type actionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const RemoveTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId } as const;
};

export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: title, todolistId: v1() } as const;
};

export const ChangeTodolistTitleAC = (
  todolistId: string,
  title: string
): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todolistId,
    title: title,
  } as const;
};
export const ChangeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: todolistId,
    filter: filter,
  } as const;
};
