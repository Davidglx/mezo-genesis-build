import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import walletReducer from './address/address.reducer';
import resultReducer from "./result/result.reducer";
import alertModalReducer from "./alert/alert.modal.reducer";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['wallet'], 
};

const rootReducer = combineReducers({
  alert: alertModalReducer,
  result: resultReducer,
  wallet: walletReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Changed: use persistedReducer as the entire reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;