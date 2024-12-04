import {PlayerI} from "../player";

export interface T3GameStateI {
    players: PlayerI[];
    history: T3GameMoveI[];
    currentMove: number;                            // number of the current move. Default = 0
}

export interface T3GameMoveI {
    date: number;                                   // the timestamp when the move occurred
    squares: T3SquareState[];                       // the state of the squares on the current move
    squareID: number | null;		                // in which square the move is made (ID). You can find out who made the move squares[squareID]
    winner: T3WinnerState;                          // Game winner if there is one
}

export interface T3WinnerI {
    player: PlayerI;
    winnerLine: number[];
}

export type T3SquareState = PlayerI | null;
export type T3WinnerState = T3WinnerI | null;