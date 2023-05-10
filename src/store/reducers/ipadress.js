import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ipadress: 'http://192.168.0.9:3000/',
};

export const ipadressSlice = createSlice({
  name: 'ipadress',
  initialState,
  reducers: {
    setIpadress: (state, action) => {
      state.ipadress = action.payload;
    },
  },
});

export const { setIpadress } = ipadressSlice.actions;

export default ipadressSlice.reducer;