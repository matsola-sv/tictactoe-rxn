import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameMoveI, GameStateI} from "../../../models/tictactoe/game";
import {GameStateContainerI, GameStateMetaI} from "./types";

const initialGameState: GameStateI = {
    // Player with the index (0) goes first
    players: [
        { id: 1, name: "X" },
        { id: 2, name: "O" }
    ],
    history: [{
        date: Date.now(),                  // The timestamp when the move occurred
        squareID: null,                    // In which square the move is made (ID). You can find out who made the move squares[squareID]
        squares: Array(9).fill(null),      // The state (null/player object) of the squares on the current move
        winner: null                       // Game winner if there is one
    }],
    currentMove: 0,                        // Number of the current move
    isPaused: false                        // Whether the game is paused (stops timer, disables board, hides history).
};

const initialGameMeta: GameStateMetaI = {
    isRestored: false                      // Indicates if the game state has been restored (false by default)
};

const gameSlice = createSlice({
    name: "t3-game",
    initialState: {
        meta: initialGameMeta,
        state: initialGameState
    },
    reducers: {
        // Restores the previous state (once) if the game was paused
        restoreGameState(state: GameStateContainerI, action: PayloadAction<GameStateI>) {
            if (!state.meta.isRestored) {
                state.state.history = action.payload.history;
                state.state.currentMove = action.payload.currentMove;
                state.meta.isRestored = true;
            }
        },
        updateCurrentMove(state: GameStateContainerI, action: PayloadAction<number>) {
            state.state.currentMove = action.payload;
        },
        updateHistoryMove(state: GameStateContainerI, action: PayloadAction<GameMoveI[]>) {
            state.state.history = action.payload;
        },
        // Go to the Game state by move number
        goToMove(state: GameStateContainerI, action: PayloadAction<number>) {
            if (state.state.currentMove !== action.payload) {
                state.state.currentMove = action.payload;
            }
        },
        //
        togglePause(container: GameStateContainerI) {
            container.state.isPaused = !container.state.isPaused;
        }
    }
});

export const { goToMove, updateHistoryMove, updateCurrentMove, restoreGameState, togglePause } = gameSlice.actions;
export default gameSlice.reducer;