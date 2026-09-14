import authReducer from "./slices/authSlice";
import jobsReducer from "./slices/jobsSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs:jobsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;