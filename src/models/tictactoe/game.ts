import {PlayerI} from "../player";
import {GameStatus} from "./gameStatus";

export interface WinnerI {
    player: PlayerI;
    winnerLine: number[];
}

export type SquareState = PlayerI | null;
export type WinnerState = WinnerI | null;

export interface GameMoveI {
    moveNumber: number;                             // Move number. Starts from zero.
    date: number;                                   // The timestamp when the move occurred
    squares: SquareState[];                         // The state of the squares on the current move
    squareID: number | null;		                // In which square the move is made (ID). You can find out who made the move squares[squareID]
    winner: WinnerState;                            // Game winner if there is one
}

export type GameMoveState = GameMoveI | null;

export interface GameStateI {
    // Ensures that the board size cannot be changed after the game starts.
    board: {
        rows: number;                              // Number of rows on the playing field (board)
        cols: number;                              // Number of columns on the playing field (board)
    };
    players: PlayerI[];
    history: GameMoveI[];
    currentMove: number;                            // Number of the current move. Default = 0
    status: GameStatus;                             // The game's current status at each stage, which affects the game logic
    time: {
        durationSecs: number;                       // Duration of the game in seconds when it is active (without pauses and status changes)
    }
}