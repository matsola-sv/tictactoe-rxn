import {combineReducers, configureStore} from "@reduxjs/toolkit";
import gameReducer from "./tictactoe/game/gameSlice";

export const rootReducer = combineReducers({
    t3game: gameReducer
});

export const store = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;