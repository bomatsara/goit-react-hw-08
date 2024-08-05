import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts/slice.js';
import filtersReducer from './filter/slice.js';
import notificationReducer from './notification/slice.js';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/slice';

const persistedAuthReducer = persistReducer(
  {
    key: 'auth-token',
    storage,
    whitelist: ['token'],
  },
  authReducer,
);

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: persistedAuthReducer,
    filters: filtersReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);