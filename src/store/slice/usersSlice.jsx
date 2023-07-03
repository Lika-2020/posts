/* eslint-disable no-param-reassign */

import { createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: [],
  loading: false,
  error: null,
  selectedUserId: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectUser: (state, action) => {
      state.selectedUserId = action.payload;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  selectUser,
} = usersSlice.actions;

export const fetchUsers = (userId) => ({ type: 'users/fetchUsers', payload: userId});



export default usersSlice.reducer;
