import {ReactElement} from "react";

export type SquareType = string | null;
export type BoardElHandlerType = {
    (squareID: number): void
}

export interface BoardPropsI {
    columns: number;                  // Number of columns on the board.
    isClickable?: boolean;            // Defines whether the board is clickable. E.g.,when the game ends, the board isn't clickable.
    isDisabled?: boolean;             // Indicates if the board is disabled (squares are hidden with visual blocking board).
    selected: number | null;          // The currently selected square ID, or null if no square is selected.
    selectedLine?: number[];          // List of square IDs that form the selected line.
    onClick: BoardElHandlerType;
    squares: SquareType[];
    fallbackComponent?: ReactElement; // Component that is rendered in case of no data
}