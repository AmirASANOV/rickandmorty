import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: number;
}

const postsSlice = createSlice({
  name: "posts",
  initialState: [] as Post[],
  reducers: {
    deletePost: (state, action: PayloadAction<number>) => {
      return state.filter((post) => post.id !== action.payload);
    },
  },
});

export const { deletePost } = postsSlice.actions;
export default postsSlice.reducer;
