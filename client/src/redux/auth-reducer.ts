import { ThunkAction } from "redux-thunk";
import authApi from "../api/auth-api";
import { TInferValue, TRootState } from "./store";

// STATE

const initialState = {
  isAuth: false,
  errors: {
    login: "",
    register: "",
  } as TErrors,
};

// ACTIONS

const SET_IS_AUTH = "todo/auth/SET_IS_AUTH";
const SET_ERROR = "todo/auth/SET_ERROR";

// ACTION CREATORS

export const actions = {
  isAuthChanged: (auth: boolean) =>
    ({ type: SET_IS_AUTH, payload: { auth } } as const),
  errorReceived: (error: TErrors) =>
    ({ type: SET_ERROR, payload: { error } } as const),
};

// REDUCER

const authReducer = (state: TState = initialState, action: TAction): TState => {
  switch (action.type) {
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload.auth,
      };
    case SET_ERROR:
      return {
        ...state,
        errors: action.payload.error,
      };
    default:
      return state;
  }
};

// THUNKS

export const registerThunk = (
  name: string,
  email: string,
  password: string
): TThunk => {
  return async (dispatch) => {
    const response = await authApi.register(name, email, password);
    if (response.code === 0) {
      localStorage.setItem("token", response.token);
      dispatch(actions.isAuthChanged(true));
    } else {
      const newErrors = {
        login: "",
        register: response.message,
      };
      dispatch(actions.errorReceived(newErrors));
    }
  };
};

export const loginThunk = (email: string, password: string): TThunk => {
  return async (dispatch) => {
    const response = await authApi.login(email, password);
    if (response.code === 0) {
      localStorage.setItem("token", response.token);
      dispatch(actions.isAuthChanged(true));
    } else {
      const newErrors = {
        login: response.message,
        register: "",
      };
      dispatch(actions.errorReceived(newErrors));
    }
  };
};

export const verifyThunk = (): TThunk => {
  return async (dispatch) => {
    const response = await authApi.verify();
    if (response) {
      dispatch(actions.isAuthChanged(true));
    }
  };
};

export default authReducer;

// TYPES

type TState = typeof initialState;

type TAction = ReturnType<TInferValue<typeof actions>>;

type TThunk = ThunkAction<Promise<void>, TRootState, {}, TAction>;

type TErrors = {
  login: string;
  register: string;
};
