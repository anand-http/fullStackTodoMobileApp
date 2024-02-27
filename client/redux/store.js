import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/userSlice";
import { taskReducer } from "./slices/taskSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        task : taskReducer,
    }
})

export default store;