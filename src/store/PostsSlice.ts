import { createSlice } from "@reduxjs/toolkit";
import { ITable, LoadingStatus } from "../types/types";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [] as ITable[],
    loadingStatus: LoadingStatus.fulfilled as LoadingStatus,
  },

  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    switchLoadingStatus: (state, action) => {
      state.loadingStatus = action.payload;
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { setPosts, switchLoadingStatus, removePost } = postsSlice.actions;
export default postsSlice.reducer;
