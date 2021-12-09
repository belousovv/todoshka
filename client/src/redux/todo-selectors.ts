import { TRootState } from "./store";

export const selectTodos = (state: TRootState) => {
  return state.todo.todos;
};

export const selectSelectedDate = (state: TRootState) => {
  return state.todo.selectedDate;
};

export const selectOldTodosCount = (state: TRootState) => {
  return state.todo.oldTodos;
};

export const selectCompletedCount = (state: TRootState) => {
  return state.todo.completedCount;
}

export const selectIncompletedCount = (state: TRootState) => {
  return state.todo.incompletedCount;
}
