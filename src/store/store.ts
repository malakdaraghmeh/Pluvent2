import { configureStore } from "@reduxjs/toolkit";
import { HomepageApi } from "./api/Homepage/useHomepage";

const store = configureStore({
    reducer: {
        [HomepageApi.reducerPath]: HomepageApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(HomepageApi.middleware)
});
export default store;