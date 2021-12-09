import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/auth-reducer";
import { selectErrors } from "../redux/auth-selectors";
import "../scss/Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const serverErrors = useSelector(selectErrors);
  const { register, handleSubmit, watch, formState: {errors}, setError} = useForm();

  const onSubmit = () => {
      dispatch(loginThunk(watch("email"), watch("password")));
  };

  useEffect(()=>{
    setError("password", {
      type: "server",
      message: serverErrors.login
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverErrors.login])

  return (
    <section className="login">
      <h1 className="login__title">Login</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="form__input"
          type="email"
          placeholder="email"
          {...register("email")}
        />
        <input
          className="form__input"
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <button className="form__btn" type="submit"></button>
      </form>
      <div className="login__error">{errors.password && errors.password.message}</div>
    </section>
  );
};

export default Login;
