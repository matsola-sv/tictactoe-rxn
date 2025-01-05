import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {GameStateContainerI, GameStateMetaI, MoveActionPayloadI} from "./types";
import {GameMoveI, GameStateI} from "../../../models/tictactoe/game";
import {GameStatus} from "../../../models/tictactoe/gameStatus";

import {getGameStatusByMove, validateMove} from "../../../services/tictactoe/gameLogic";

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
    status: GameStatus.Waiting,            // The game's current status at each stage, which affects the game logic
};

const initialGameMeta: GameStateMetaI = {
    // Indicates if the game state has been restored (false by default)
    isRestored: false,

    // Stores the previous game status to correctly handle transitions
    // between modes (e.g., between the active game and the game history view). This field
    // allows returning to the previous game status after exiting the history view mode.
    previousStatus: GameStatus.Waiting,
};

/**
 * This is the only mechanism for changing the game status.
 * Note: it is advisable to use it, not change it manually!
 *
 * @param container
 * @param newStatus
 */
const updateStatusGame = (container: GameStateContainerI, newStatus: GameStatus): void => {
    if (container.state.status === newStatus) {
        return;
    }

    // Set the previous status if it hasn't been updated already.
    if (container.meta.previousStatus !== container.state.status) {
        container.meta.previousStatus = container.state.status;
    }

    // Update the current game status.
    container.state.status = newStatus;
};

/**
 * NOTE:
 * To simplify testing, the logic for changing the game status has been moved
 * from the src/components/Game/Game.tsx to Redux actions. This separation allows for easier
 * unit testing and better state management in the application.
 */
const gameSlice = createSlice({
    name: "t3-game",
    initialState: {
        meta: initialGameMeta,
        state: initialGameState
    },
    reducers: {
        // Restores the previous state (once) if the game was paused
        restoreGameState(container: GameStateContainerI, action: PayloadAction<GameStateI>) {
            if (!container.meta.isRestored) {
                container.state.history = action.payload.history;
                container.state.currentMove = action.payload.currentMove;
                container.meta.isRestored = true;

                // Set status to "Waiting" if the game is being restored, and it's not already in that state
                if (container.state.status !== GameStatus.Waiting) {
                    updateStatusGame(container, GameStatus.Waiting);
                }
            }
        },
        // Updates current move number, history moves and changes game status if needed
        makeMove(container: GameStateContainerI, action: PayloadAction<MoveActionPayloadI>) {
            const { currentMove, history } = action.payload;
            const { isValid, error } = validateMove(currentMove, history);

            if (!isValid) {
                console.error(`[Action makeMove]: ${error}`);
                return;
            }

            // Update state for move
            container.state.currentMove = currentMove;
            container.state.history = history;
            const move: GameMoveI = history[currentMove];

            // Starts the game if it's the first move in the current session
            if (container.state.status === GameStatus.Waiting) {
                updateStatusGame(container, GameStatus.Running);
            }

            // Get the game status for the new move and update it if it has changed.
            // Note: The updateStatusGame function will not update the status if the new status is the same as the current one.
            updateStatusGame(container, getGameStatusByMove(move, currentMove));
        },

        // Go to the Game state by move number
        goToMove(container: GameStateContainerI, action: PayloadAction<number>) {
            const moveTo: number = action.payload;
            if (container.state.currentMove !== moveTo) {
                // Note: We need to copy Redux state, not origin object!
                const historyCopy = JSON.parse(JSON.stringify(container.state.history));
                const { isValid, error } = validateMove(moveTo, historyCopy);

                if (!isValid) {
                    console.error(`[Action goToMove]: ${error}`);
                    return;
                }
                // Update the current move to the specified step in the game's history.
                container.state.currentMove = moveTo;

                // If the target move is in the past, switch to "ViewingHistory" state.
                const totalMoves: number = container.state.history.length - 1;
                if (moveTo < totalMoves) {
                    updateStatusGame(container, GameStatus.ViewingHistory);
                    return;
                }
                // Exiting the history viewing mode. Restore the game status that was active
                // before transitioning to the history viewing mode.
                updateStatusGame(container, container.meta.previousStatus);
            }
        },

        // Go the game to an active state where timers are running, players can make moves, etc.
        startGame(container: GameStateContainerI) {
            updateStatusGame(container, GameStatus.Running);
        },

        // Pauses or resumes the game (transition from "running"=>"paused" / "paused"=>"running")
        // Whether the game is paused (stops timer, disables board, hides history).
        togglePause(container: GameStateContainerI) {
            const status: GameStatus = container.state.status;
            const noPauseStatuses: GameStatus[] = [
                GameStatus.Waiting,
                GameStatus.Stopped,
                GameStatus.ViewingHistory
            ];
            // Prevent pausing if the game is stopped, in history view, or not yet started.
            if (noPauseStatuses.indexOf(status) >= 0) {
                return;
            }

            // Switch between "Running" and "Paused" states
            const newStatus: GameStatus = (status === GameStatus.Paused)
                ? GameStatus.Running
                : GameStatus.Paused;
            updateStatusGame(container, newStatus);
        },

        // Stop the game (win or other action) - from running or paused to stopped
        stopGame(container: GameStateContainerI) {
            updateStatusGame(container, GameStatus.Stopped);
        },

        // Saving the game (going from "paused" => "saving")
        saveGame(container: GameStateContainerI) {
            updateStatusGame(container, GameStatus.Saving);
        },

        // After successfully saving (goes from "saving" => "waiting" or "stopped")
        finishSavingGame(container: GameStateContainerI, action: PayloadAction<boolean>) {
            const newStatus = action.payload
                ? GameStatus.Waiting
                : GameStatus.Stopped;
            updateStatusGame(container, newStatus);
        },
    }
});

export const {
    goToMove,
    makeMove,
    restoreGameState,
    togglePause
} = gameSlice.actions;

export default gameSlice.reducer;