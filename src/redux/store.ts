import authReducer from "./slices/authSlice";
import jobsReducer from "./slices/jobsSlice";
import appliacationsReducer from "./slices/applicationsSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs:jobsReducer,
    applications:appliacationsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;