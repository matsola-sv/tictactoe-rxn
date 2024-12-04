import {PlayerI} from "../player";

export interface GameStateI {
    players: PlayerI[];
    history: GameMoveI[];
    currentMove: number;                            // number of the current move. Default = 0
}

export interface GameMoveI {
    date: number;                                   // the timestamp when the move occurred
    squares: SquareState[];                       // the state of the squares on the current move
    squareID: number | null;		                // in which square the move is made (ID). You can find out who made the move squares[squareID]
    winner: WinnerState;                          // Game winner if there is one
}

export interface WinnerI {
    player: PlayerI;
    winnerLine: number[];
}

export type SquareState = PlayerI | null;
export type WinnerState = WinnerI | null;