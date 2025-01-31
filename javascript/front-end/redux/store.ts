import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "./slices/auth/registerSlice";
import loginReducer from "./slices/auth/loginSlice";
import pageReducer from "./slices/page/pageSlice";
import followingReducer from "./slices/page/followAndUnfollowSlice";
import postReducer from "./slices/post/postSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        page: pageReducer,
        following: followingReducer,
        post: postReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
