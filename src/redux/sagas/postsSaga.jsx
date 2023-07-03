import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
} from '../../store/slice/postsSlice';

export default function* fetchPostsSaga() {
  try {
    yield put(fetchPostsStart());
    const response = yield call(
      axios.get,
      'https://jsonplaceholder.typicode.com/posts'
    );
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}


