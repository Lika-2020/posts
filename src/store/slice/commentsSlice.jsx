/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  commentsByPostId: {},
  error: null,
  loading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchCommentsStart: (state) => {
        state.loading = true;
        state.error = null;
      },
    fetchCommentsSuccess: (state, action) => {
      state.loading = false;
      state.commentsByPostId[action.payload.postId] = action.payload.comments;
    },
    fetchCommentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCommentsStart, fetchCommentsSuccess, fetchCommentsFailure } =
  commentsSlice.actions;

export const fetchComments = (postId) => ({ type: 'comments/fetchComments',  payload: postId});

export default commentsSlice.reducer;
