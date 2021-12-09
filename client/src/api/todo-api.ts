import { TTodo } from "../redux/todo-reducer";
import api from "./api";

const todoApi = {
  // create todo

  createTodo: (description: string, date: number) => {
    return api
      .post<TTodo>("/todo", { description, date })
      .then((res) => res.data);
  },

  // get all todos

  getAllTodos: (date: number) => {
    return api.get<TTodo[]>(`/todo/${date}`).then((res) => res.data);
  },

  // get todo by id

  getTodoById: (id: number) => {
    return api.get<TTodo>(`/todo/${id}`).then((res) => res.data);
  },

  // remove todo

  removeTodo: (id: number) => {
    return api.delete<TTodo>(`/todo/${id}`).then((res) => res.data);
  },

  // change todo

  changeTodo: (id: number, description: string, solved: boolean) => {
    return api
      .put<TTodo>(`/todo/${id}`, { description, solved })
      .then((res) => res.data);
  },

  // get count of old todos

  getOldTodosCount: (date: number) => {
    return api
      .get<{ count: number }>(`/todo/old/${date}`)
      .then((res) => res.data);
  },

  removeOldTodos: (date: number) => {
    return api.delete<{code: number}>(`/todo/old/${date}`).then(res => res.data);
  },

  getSolvedCount: (solved: boolean) => {
    return api.get(`/todo/statistics/count?solved=${solved}`).then(res => res.data);
  }
};

export default todoApi;
