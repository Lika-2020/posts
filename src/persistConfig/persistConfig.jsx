import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users'], // имена срезов (slices), которые сохраняю
};

 export const postsPersistConfig = {
  key: 'posts',
  storage,
};

export const commentsPersistConfig = {
  key: 'comments',
  storage,
};

export default persistConfig;
