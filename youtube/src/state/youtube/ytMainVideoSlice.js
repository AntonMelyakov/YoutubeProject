import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

const ytMainVideoSlice = createSlice({
  name: "ytMainVideo",
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addVideo } = ytMainVideoSlice.actions;

export default ytMainVideoSlice.reducer;
