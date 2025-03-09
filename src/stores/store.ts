import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../reducers/User.slice';
import categoriesReducer from '../reducers/Category.slice';
export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesReducer,
  },
});

// Tạo type RootState và AppDispatch để dùng trong app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
