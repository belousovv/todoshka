import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeTodoThunk, removeTodoThunk, TTodo } from "../redux/todo-reducer";
import "../scss/TodoItem.scss";
import cn from "classnames";

const TodoItem: React.FC<TProps> = ({ description, todo }) => {
  // editable content from <li>
  const [value, setValue] = useState(description);
  const dispatch = useDispatch();

  const onSendChange = () => {
    dispatch(changeTodoThunk(todo.todo_id, value, todo.solved));
  };

  // classes
  const itemClass = cn({
    "todo-list__item": true,
    "todo-list__item--solved": todo.solved,
  });

  // solve todo handler

  const onSolved = () => {
    dispatch(changeTodoThunk(todo.todo_id, value, !todo.solved));
  };

  // delete todo handler

  const onDelete = () => {
    dispatch(removeTodoThunk(todo.todo_id));
  };

  return (
    <li className={itemClass}>
      <div
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setValue(e.currentTarget.innerText)}
        onBlur={onSendChange}
        className="todo-list__item-text"
      >
        {description}
      </div>
      <span className="todo-list__item-solve-btn" onClick={onSolved}></span>
      <span className="todo-list__item-delete-btn" onClick={onDelete}></span>
    </li>
  );
};

export default React.memo(TodoItem);

// TYPES

type TProps = {
  description: string;
  todo: TTodo;
};
