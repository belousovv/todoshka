import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Statistics from "../pages/Statistics";
import Todo from "../pages/Todo";
import { selectIsAuth } from "../redux/auth-selectors";

const AppRoutes: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <Routes>
      <Route
        path="/auth/login"
        element={isAuth ? <Navigate to="/todo" /> : <Login />}
      />
      <Route
        path="/auth/register"
        element={isAuth ? <Navigate to="/todo" /> : <Register />}
      />
      <Route
        path="/todo"
        element={isAuth ? <Todo /> : <Navigate to="/auth/login" />}
      />
      <Route
        path="/statistics"
        element={isAuth ? <Statistics /> : <Navigate to="/auth/login" />}
      />
      <Route path="/" element={<Navigate to="/todo" />} />
    </Routes>
  );
};

export default AppRoutes;
