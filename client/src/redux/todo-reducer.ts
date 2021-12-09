import { ThunkAction } from "redux-thunk";
import todoApi from "../api/todo-api";
import { dateConverter } from "../utils/dateConverter";
import { TInferValue, TRootState } from "./store";

// STATE

const initialState = {
  todos: [] as TTodo[],
  selectedDate: new Date() as Date,
  oldTodos: 0, // count of old todos
  completedCount: 0,
  incompletedCount: 0,
};

// ACTIONS

const SET_TODOS = "todo/todo/SET_TODOS";
const ADD_TODO = "todo/todo/ADD_TODO";
const REMOVE_TODO = "todo/todo/REMOVE_TODO";
const CHANGE_TODO = "todo/todo/CHANGE_TODO";
const CHANGE_SELECTED_DATE = "todo/todo/CHANGE_SELECTED_DATE";
const GET_OLD_TODOS_COUNT = "todo/todo/GET_OLD_TODOS_COUNT";
const CHANGE_COMPLETED_COUNT = "todo/todo/CHANGE_COMPLETED_COUNT";
const CHANGE_INCOMPLETED_COUNT = "todo/todo/CHANGE_INCOMPLETED_COUNT";

// ACTION CREATORS

export const actions = {
  todosReceived: (todos: TTodo[]) =>
    ({ type: SET_TODOS, payload: { todos } } as const),
  todoAdded: (todo: TTodo) => ({ type: ADD_TODO, payload: { todo } } as const),
  todoRemoved: (todo: TTodo) =>
    ({ type: REMOVE_TODO, payload: { todo } } as const),
  todoChanged: (todo: TTodo) =>
    ({ type: CHANGE_TODO, payload: { todo } } as const),
  dateChanged: (date: Date) =>
    ({ type: CHANGE_SELECTED_DATE, payload: { date } } as const),
  todosCountChanged: (count: number) =>
    ({ type: GET_OLD_TODOS_COUNT, payload: { count } } as const),
  completedCountChanged: (count: number) =>
    ({ type: CHANGE_COMPLETED_COUNT, payload: { count } } as const),
  incompletedCountChanged: (count: number) =>
    ({ type: CHANGE_INCOMPLETED_COUNT, payload: { count } } as const),
};

// REDUCER

const todoReducer = (state: TState = initialState, action: TAction): TState => {
  switch (action.type) {
    case CHANGE_COMPLETED_COUNT:
      return {
        ...state,
        completedCount: action.payload.count,
      };
    case CHANGE_INCOMPLETED_COUNT:
      return {
        ...state,
        incompletedCount: action.payload.count,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
      };
    }
    case REMOVE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos.filter(
            (t) => t.todo_id !== action.payload.todo.todo_id
          ),
        ],
      };
    case CHANGE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos.map((t) =>
            t.todo_id === action.payload.todo.todo_id ? action.payload.todo : t
          ),
        ],
      };
    case CHANGE_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload.date,
      };
    case GET_OLD_TODOS_COUNT:
      return {
        ...state,
        oldTodos: action.payload.count,
      };
    default:
      return state;
  }
};

export default todoReducer;

// THUNKS

export const getAllTodosThunk = (date: Date): TThunk => {
  return async (dispatch) => {
    const response = await todoApi.getAllTodos(dateConverter(date));
    if (response) {
      dispatch(actions.todosReceived(response));
    }
  };
};

export const createTodoThunk = (description: string, date: Date): TThunk => {
  return async (dispatch) => {
    const response = await todoApi.createTodo(description, dateConverter(date));
    if (response) {
      dispatch(actions.todoAdded(response));
    }
  };
};

export const removeTodoThunk = (id: number): TThunk => {
  return async (dispatch) => {
    const response = await todoApi.removeTodo(id);
    if (response) {
      dispatch(actions.todoRemoved(response));
    }
  };
};

export const changeTodoThunk = (
  id: number,
  description: string,
  solved: boolean
): TThunk => {
  return async (dispatch) => {
    const response = await todoApi.changeTodo(id, description, solved);
    if (response) {
      dispatch(actions.todoChanged(response));
    }
  };
};

export const getOldTodosCountThunk = (date: Date): TThunk => {
  return async (dispatch) => {
    const count = await todoApi.getOldTodosCount(dateConverter(date));
    if (count) {
      dispatch(actions.todosCountChanged(count.count));
    }
  };
};

export const removeOldTodosThunk = (date: Date): TThunk => {
  return async (dispatch) => {
    const response = await todoApi.removeOldTodos(dateConverter(date));
    if (response.code === 0) {
      dispatch(actions.todosCountChanged(0));
    }
  };
};

export const getCompletedCountThunk = (): TThunk => {
  return async (dispatch) => {
    const count = await todoApi.getSolvedCount(true);
    if (count) {
      dispatch(actions.completedCountChanged(count.count));
    }
  };
};

export const getIncompletedCountThunk = (): TThunk => {
  return async (dispatch) => {
    const count = await todoApi.getSolvedCount(false);
    if (count) {
      dispatch(actions.incompletedCountChanged(count.count));
    }
  };
};

// TYPES

export type TTodo = {
  todo_id: number;
  solved: boolean;
  description: string;
  date: Date;
};

type TState = typeof initialState;

type TAction = ReturnType<TInferValue<typeof actions>>;

type TThunk = ThunkAction<Promise<void>, TRootState, {}, TAction>;
