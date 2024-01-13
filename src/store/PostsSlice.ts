import { createSlice } from "@reduxjs/toolkit";
import { ITable, LoadingStatus } from "../types/types";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [] as ITable[],
    loadingStatus: LoadingStatus.fulfilled as LoadingStatus,
    selectedPostIds: [] as number[],
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
    selectPost: (state, action) => {
      state.selectedPostIds.push(action.payload);
    },

    deselectPost: (state, action) => {
      state.selectedPostIds = state.selectedPostIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const {
  setPosts,
  switchLoadingStatus,
  removePost,
  selectPost,
  deselectPost,
} = postsSlice.actions;
export default postsSlice.reducer;
