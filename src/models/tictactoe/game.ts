import {PlayerI} from "../player";
import {GameStatus} from "./gameStatus";
import {SortTypes} from "../../utils/sorting";

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
    players: PlayerI[];
    history: GameMoveI[];
    currentMove: number;                            // Number of the current move. Default = 0
    status: GameStatus;                             // The game's current status at each stage, which affects the game logic
    time: {
        durationSecs: number;                       // Duration of the game in seconds when it is active (without pauses and status changes)
    },

    //TODO interface settings Move number";
    settings: {
        // History moves settings
        history: {
            sorting: {
                order: SortTypes,               // Order of sorting (e.g., ascending, descending)
                field: string                   // The currently selected sorting field (e.g., move number)
            },
            visibility: boolean,                // Whether history of moves is visible or not
        },
    }
}