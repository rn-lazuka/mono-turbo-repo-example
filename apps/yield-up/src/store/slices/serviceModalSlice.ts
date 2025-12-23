import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ServiceModalName } from '@shared/enums/modals';

export type ServiceModalSliceState = {
  [key in ServiceModalName]?: any;
};

const initialState: ServiceModalSliceState = {};

export const serviceModalSlice = createSlice({
  name: 'serviceModal',
  initialState,
  reducers: {
    addServiceModal: (
      state,
      { payload: { name, payload } }: PayloadAction<{ name: ServiceModalName; payload?: any }>
    ) => {
      state[name] = payload;
    },
    removeServiceModal: (state, { payload }: PayloadAction<ServiceModalName>) => {
      delete state[payload];
    },
    removeAllServiceModals: () => {
      return initialState;
    },
  },
});

export const { addServiceModal, removeServiceModal, removeAllServiceModals } =
  serviceModalSlice.actions;

export default serviceModalSlice.reducer;
