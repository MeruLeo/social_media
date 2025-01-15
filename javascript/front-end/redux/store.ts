import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "./slices/auth/registerSlice";
import loginReducer from "./slices/auth/loginSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
