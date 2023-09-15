import { configureStore } from "@reduxjs/toolkit";
import reminderReducer from "../features/reminder/reminderSlice";

const store = configureStore({
  reducer: {
    reminder: reminderReducer,
  },
});

export default store;
