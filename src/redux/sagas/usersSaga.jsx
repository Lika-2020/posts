import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from '../../store/slice/usersSlice';

export default function* fetchUserSaga() {
  try {
    yield put(fetchUserStart());

    const response = yield call(
      axios.get,
      `https://jsonplaceholder.typicode.com/users/`
    );
  
    yield put(fetchUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}
