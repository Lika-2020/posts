/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  currentUserId: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPostsByUserStart: (state, action) => {
      state.loading = true;
      state.error = null;
      state.currentUserId = action.payload; // Сохраняем идентификатор текущего пользователя
    },
  },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure, fetchPostsByUserStart} =
  postsSlice.actions;

export const fetchPosts = () => ({ type: 'posts/fetchPosts' });
export const fetchPostsByUser = (userId) => ({
  type: 'posts/fetchPostsByUser',
  payload: userId,
});

export default postsSlice.reducer;
