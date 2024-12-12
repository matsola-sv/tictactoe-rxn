import {PlayerI} from "../player";

export interface GameStateI {
    players: PlayerI[];
    history: GameMoveI[];
    currentMove: number;                            // Number of the current move. Default = 0
    isPaused: boolean;                              // Whether the game is paused (stops timer, disables board, hides history).
}

export interface GameMoveI {
    date: number;                                   // The timestamp when the move occurred
    squares: SquareState[];                         // The state of the squares on the current move
    squareID: number | null;		                // In which square the move is made (ID). You can find out who made the move squares[squareID]
    winner: WinnerState;                            // Game winner if there is one
}

export interface WinnerI {
    player: PlayerI;
    winnerLine: number[];
}

export type SquareState = PlayerI | null;
export type WinnerState = WinnerI | null;