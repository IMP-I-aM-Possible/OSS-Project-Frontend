import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
};

export const idSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
      console.log(state.id)
    },
  },
});

export const { setId } = idSlice.actions;

export default idSlice.reducer;