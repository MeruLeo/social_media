import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "./slices/auth/registerSlice";
import loginReducer from "./slices/auth/loginSlice";
import pageReducer from "./slices/page/pageSlice";
import followingReducer from "./slices/page/followAndUnfollowSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        page: pageReducer,
        following: followingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
