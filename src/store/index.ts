import {combineReducers, configureStore} from "@reduxjs/toolkit";
import gameReducer from "store/tictactoe/game/gameSlice";
import playerReducer from "store/tictactoe/player/playerSlice";

export const rootReducer = combineReducers({
    t3game: gameReducer,
    t3player: playerReducer,
});

export const index = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: rootReducer
});

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;