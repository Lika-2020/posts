import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCommentsSuccess,
  fetchCommentsFailure,
} from '../../store/slice/commentsSlice';

export default function* fetchCommentsSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `https://jsonplaceholder.typicode.com/comments?postId=${action.payload}`
    );

    yield put(
      fetchCommentsSuccess({ postId: action.payload, comments: response.data })
    );
  } catch (error) {
    yield put(fetchCommentsFailure(error.message));
  }
}
