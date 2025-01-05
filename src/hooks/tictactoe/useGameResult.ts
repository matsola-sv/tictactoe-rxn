import {GameMoveState, GameStateI, WinnerState} from "../../models/tictactoe/game";
import {GameStatus} from "../../models/tictactoe/gameStatus";

export interface GameResultConfigI {
    gameState: GameStateI
}

export interface GameResultI {
    winner: WinnerState;    // The winner of the game (or null if there is none)
    isDraw: boolean;        // Flag indicating whether the game is a draw
}

/**
 * Custom hook to calculate the game's result.
 * Determines the winner (if any) and whether the game ended in a draw.
 *
 * @param config
 */
const useGameResult = (config: GameResultConfigI): GameResultI => {
    const status: GameStatus = config.gameState.status;

    // Get the current move from the history
    const getMove = (): GameMoveState => {
        const moveID: number = config.gameState.currentMove
        return config.gameState.history[moveID] ?? null;
    }

    return {
        winner: getMove()?.winner ?? null,
        // Check if game is stopped and no winner, indicating a draw
        isDraw: status === GameStatus.Stopped && !getMove()?.winner,
    };
};
export default useGameResult;