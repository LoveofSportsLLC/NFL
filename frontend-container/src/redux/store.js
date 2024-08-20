//NFL/frontend-container/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';

// Combine the reducers
const rootReducer = {
  counter: counterReducer,
  // Add other reducers as needed
};

// Configure the store with the initial state and combined reducers
export const store = configureStore({
  reducer: rootReducer,
});
