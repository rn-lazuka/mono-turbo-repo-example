import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuth: boolean;
  isAuthChecked: boolean;
  email: string | null;
}

const initialState: UserState = {
  isAuth: false,
  isAuthChecked: false,
  email: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      state.isAuth = true;
      state.isAuthChecked = true;
      state.email = action.payload.email;
    },
    setAuthCheck: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    logout: () => {
      return { ...initialState, isAuthChecked: true };
    },
  },
  selectors: {
    isAuth: (state) => state.isAuth,
    isAuthChecked: (state) => state.isAuthChecked,
    email: (state) => state.email,
  },
});

export const { login, logout, setAuthCheck } = userSlice.actions;
export const { isAuth, isAuthChecked, email } = userSlice.selectors;
export default userSlice.reducer;
