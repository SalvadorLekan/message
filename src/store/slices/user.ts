import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface UserState {
  user: User | null;
}
const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export function selectUser(state: RootState) {
  return state.user.user;
}

export const selectLoggedInUser = (state: RootState) => state.user.user!;

export default userSlice.reducer;
