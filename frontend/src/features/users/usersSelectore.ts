import type {RootState} from "../../app/store.ts";

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;

export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;