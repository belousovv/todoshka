import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, getAllTodosThunk } from "../redux/todo-reducer";
import "../scss/Todo.scss";
import Calendar from "react-calendar";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";
import { selectSelectedDate } from "../redux/todo-selectors";

const Todo: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);

  useEffect(() => {
    dispatch(getAllTodosThunk(selectedDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const onDateChange = (e: Date) => {
    dispatch(actions.dateChanged(e));
  };

  return (
    <section className="todo">
      <div className="todo__calendar-img"></div>
      <Calendar value={selectedDate} onChange={onDateChange} />
      <TodoList />
      <AddTodo />
    </section>
  );
};

export default Todo;
