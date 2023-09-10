import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi';               // importing this query from service folder 
import { cryptonewsApi } from '../services/cryptonewsApi';        
import { setupListeners } from '@reduxjs/toolkit/dist/query';      

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptonewsApi.reducerPath]: cryptonewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware).concat(cryptonewsApi.middleware),
});

setupListeners(store.dispatch);