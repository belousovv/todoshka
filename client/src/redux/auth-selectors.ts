import { TRootState } from "./store";

export const selectIsAuth = (state: TRootState) => {
    return state.auth.isAuth;
}

export const selectErrors = (state: TRootState) => {
    return state.auth.errors
}