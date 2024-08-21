import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
const store = configureStore({
    reducer: {

    },
    middleware: (getDefaultMiddlware) => {
        return getDefaultMiddlware().concat(logger);
      },
});

export default store;