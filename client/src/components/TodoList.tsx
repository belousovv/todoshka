import React from 'react'
import { useSelector } from 'react-redux';
import { selectTodos } from '../redux/todo-selectors';
import "../scss/TodoList.scss";
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const todos = useSelector(selectTodos);

    return (
        <ul className="todo-list">
            {todos.map(t => <TodoItem key={t.todo_id} description={t.description} todo={t} />)}
        </ul>
    )
}

export default TodoList
