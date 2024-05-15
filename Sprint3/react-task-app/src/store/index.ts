import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";

const store = configureStore({
    reducer: reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisptach = typeof store.dispatch;


export default store;