import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodoThunk } from "../redux/todo-reducer";
import { selectSelectedDate } from "../redux/todo-selectors";
import "../scss/AddTodo.scss";

const AddTodo: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);

  const initialValue = "";

  // value from editable text

  const [value, setValue] = useState(initialValue);

  // create new todo

  const onCreate = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    // create only if text not equal initialValue

    if (e.currentTarget.innerText !== initialValue) {
      dispatch(createTodoThunk(value, selectedDate));
    }

    // reset editable text
    e.currentTarget.innerText = initialValue;
  };

  return (
    <div
      className="add-todo"
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => setValue(e.currentTarget.innerText)}
      onBlur={(e) => onCreate(e)}
    >
      {initialValue}
    </div>
  );
};

export default AddTodo;
