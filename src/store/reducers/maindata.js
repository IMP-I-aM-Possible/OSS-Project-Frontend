import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  DATA: null,
};

export const DATASlice = createSlice({
  name: 'DATA',
  initialState,
  reducers: {
    setDATA: (state, action) => {
      state.DATA = action.payload;
      console.log(state.DATA)
    },
  },
});

export const { setDATA } = DATASlice.actions;

export default DATASlice.reducer;