import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counter from './counter';
// Define the root reducer. This is a function that takes the current state and an action, and returns a new state.
// In this case, we're using the combineReducers function from Redux Toolkit to combine multiple reducers into one.
// This allows us to split our state management logic into smaller, more manageable pieces.
const rootReducers = combineReducers({
  counter
});

// Create the Redux store. This is the centralized state management system for our application.
// The configureStore function from Redux Toolkit is used to set up the store.
// It takes an object with a reducer property, which is the root reducer we defined earlier.
const store = configureStore({
  reducer: rootReducers
});

// Set up listeners for the store. This is necessary for the Redux Toolkit Query feature to work correctly.
// The setupListeners function from Redux Toolkit Query takes the store's dispatch function as an argument.
setupListeners(store.dispatch);

// Export the store and the root reducers. This allows other parts of the application to access
export { store, rootReducers as reducer };
