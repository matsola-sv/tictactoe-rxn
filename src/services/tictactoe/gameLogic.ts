import {PlayerI} from "../../models/player";
import {GameMoveI, GameStateI, SquareState, WinnerState} from "../../models/tictactoe/game";
import {GameStatus} from "../../models/tictactoe/gameStatus";
import {ValidationResult} from "../../models/common";
import {PaginationDetails} from "../../models/lists";

/**
 * Determines the current player based on the game's state and current move.
 * @param gameState
 */
export const getCurrentPlayer = (gameState: GameStateI): PlayerI => {
    const moveID = gameState.currentMove;
    const players = gameState.players;

    return moveID %2 === 0 ? players[0] : players[1];
}

/**
 * Calculates the game winner on the field
 * @param squares
 */
export const calculateWinner = (squares: SquareState[]): WinnerState => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] &&
            squares[a]?.id === squares[b]?.id &&
            squares[a]?.id === squares[c]?.id
        ) {
            return {
                player: squares[a] as PlayerI,
                winnerLine: lines[i]
            };
        }
    }
    return null;
}

export const validateMove = (moveID: number, history: GameMoveI[]): ValidationResult => {
    // Allows overriding specific fields via the `overrides` parameter.
    let createResult = (overrides: Partial<ValidationResult>): ValidationResult => {
        return { isValid: true, error: null, ...overrides };
    }

    if (moveID < 0) {
        return createResult({
            isValid: false, error: "Move number cannot be less than"
        });
    }

    if (!history[moveID]) {
        return createResult({
            isValid: false, error: `Move number ${moveID} does not exist in the game history.`
        });
    }
    return createResult({});
};

export const getGameStatusByMove = (move: GameMoveI, currentMove: number): GameStatus => {
    // Ends the game when a winner is detected or no moves are left.
    // The game ends when the current move ID (from 0 to 9) equals the total number of squares (9).
    // There can be up to 10 moves, but since the history is shifted to the current move (2), the game may not end at 9 moves.
    const isMovesEnded = move.squares.length === currentMove;

    if (move.winner || isMovesEnded) {
        return GameStatus.Stopped;
    }
    return  GameStatus.Running;
};

/**
 * Returns pagination details for navigating through game moves.
 * @param currentMove
 * @param history
 */
export const getMovesPagination = ({currentMove, history}: GameStateI): PaginationDetails => {
    return {
        nextItem: currentMove < (history.length - 1) ? currentMove + 1 : null,
        prevItem: currentMove > 0 ? currentMove - 1 : null,
        currentItem: currentMove,
        totalItems: history.length,
        currentPage: 1,
        itemsPerPage: history.length,
        totalPages: 1,
        hasMorePages: false
    };
};