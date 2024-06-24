import { configureStore } from "@reduxjs/toolkit";
import ytListReducer from "./youtube/ytListSlice";
import ytMainVideoReducer from "./youtube/ytMainVideoSlice";

export const store = configureStore({
  reducer: {
    ytList: ytListReducer,
    ytMainVideo: ytMainVideoReducer,
  },
});
