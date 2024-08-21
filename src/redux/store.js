import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { usersReducer } from "./usersSlice/slice";
const store = configureStore({
    reducer: {
        user: usersReducer,
    },
    middleware: (getDefaultMiddlware) => {
        return getDefaultMiddlware().concat(logger);
      },
});

export default store;