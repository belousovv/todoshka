import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../redux/auth-reducer";
import { selectErrors } from "../redux/auth-selectors";
import "../scss/Register.scss";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const serverErrors = useSelector(selectErrors);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    dispatch(registerThunk(watch("name"), watch("email"), watch("password")));
  };

  useEffect(() => {
    setError("password", {
      type: "server",
      message: serverErrors.register,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverErrors.register]);

  return (
    <section className="register">
      <h1 className="register__title">Register</h1>
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
        <input
          className="form__input"
          type="text"
          placeholder="name"
          {...register("name")}
        />
        <button className="form__btn" type="submit"></button>
      </form>
      <div className="register__error">
        {errors.password && errors.password.message}
      </div>
    </section>
  );
};

export default Register;
