import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T3GameMoveI, T3GameStateI} from "../../../models/tictactoe/game";
import {GameStateContainerI, GameStateMetaI} from "./types";

export const initialGameState: T3GameStateI = {
    // Player with the index (0) goes first
    players: [
        { id: 1, name: "X" },
        { id: 2, name: "O" }
    ],
    history: [{
        date: Date.now(),               // the date of the move
        squareID: null,                 // current square id
        squares: Array(9).fill(null),   // list of squares and moves in them
        winner: null
    }],
    currentMove: 0,                     // current move number
};

export const initialGameMeta: GameStateMetaI = {
    isRestored: false                   // indicates if the game state has been restored (false by default)
};

const gameSlice = createSlice({
    name: "t3-game",
    initialState: {
        meta: initialGameMeta,
        state: initialGameState
    },
    reducers: {
        // Restores the previous state (once) if the game was paused
        restoreGameState(state: GameStateContainerI, action: PayloadAction<T3GameStateI>) {
            if (!state.meta.isRestored) {
                state.state.history = action.payload.history;
                state.state.currentMove = action.payload.currentMove;
                state.meta.isRestored = true;
            }
        },
        updateCurrentMove(state: GameStateContainerI, action: PayloadAction<number>) {
            state.state.currentMove = action.payload;
        },
        updateHistoryMove(state: GameStateContainerI, action: PayloadAction<T3GameMoveI[]>) {
            state.state.history = action.payload;
        },
        // Go to the Game state by move number
        goToMove(state: GameStateContainerI, action: PayloadAction<number>) {
            if (state.state.currentMove !== action.payload) {
                state.state.currentMove = action.payload;
            }
        },
    }
});

export const { goToMove, updateHistoryMove, updateCurrentMove, restoreGameState } = gameSlice.actions;
export default gameSlice.reducer;