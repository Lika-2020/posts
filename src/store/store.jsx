import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import postsReducer from './slice/postsSlice';
import watchFetchPosts from '../redux/sagas/saga';
import commentsReducer from './slice/commentsSlice';
import usersReducer from './slice/usersSlice';
import persistConfig, {
  postsPersistConfig,
  commentsPersistConfig,
} from '../persistConfig/persistConfig';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  posts: persistReducer(postsPersistConfig, postsReducer),
  comments: persistReducer(commentsPersistConfig, commentsReducer),
  users: usersReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchPosts);

export const persistor = persistStore(store);
export default store;
