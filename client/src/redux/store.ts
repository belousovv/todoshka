import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./auth-reducer";
import todoReducer from "./todo-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

// TYPES

export type TInferValue<T> = T extends { [key: string]: infer U } ? U : never;

export type TRootState = ReturnType<typeof rootReducer>;
