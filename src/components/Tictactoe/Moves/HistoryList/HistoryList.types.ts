import {ReactElement} from "react";

export interface HistoryMoveI {
    id: number,
    date: Date,
    squareID: number
}

export interface HistoryListProps {
    moves: HistoryMoveI[];              // List of move history to display
    currentMove: number;                // Number of the current (active) move
    fallbackComponent?: ReactElement;   // Component that is rendered in case of no data
    canShowDate?: boolean;              // Determines whether the date of the move should be shown in the history of moves
}

export type MovesHistoryHandlerI = {
    (moveID: number): void
}