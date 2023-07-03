import { takeLatest, takeEvery } from 'redux-saga/effects';
import fetchPostsSaga from './postsSaga';
import fetchCommentsSaga from './commentsSaga';
import fetchUserSaga from './usersSaga'
import fetchPostsByUserSaga from './postsByUserSaga';

export default function* watchFetchPosts() {
  yield takeLatest('posts/fetchPosts', fetchPostsSaga);
  yield takeEvery('comments/fetchComments', fetchCommentsSaga);
  yield takeEvery('users/fetchUsers', fetchUserSaga);
  yield takeEvery('posts/fetchPostsByUser', fetchPostsByUserSaga);
}
