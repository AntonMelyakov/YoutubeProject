import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const ytListSlice = createSlice({
  name: "ytList",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addList } = ytListSlice.actions;

export default ytListSlice.reducer;
