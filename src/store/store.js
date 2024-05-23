import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../slice/categories';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
