import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AlertType } from '@shared/enums/common';

interface SnackbarState {
  open: boolean;
  message: string;
  title?: string;
  severity: AlertType;
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  title: '',
  severity: AlertType.Info,
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<{ message: string; severity?: AlertType }>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || AlertType.Info;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
