import {HistoryMoveI} from "../../../models/tictactoe/game";
import {ReactElement} from "react";

export interface MovesHistoryPropsI {
    moves: HistoryMoveI[],
    currentMove: number,
    isDisabled?: boolean;             // Indicates if the moves history is disabled (moves list are hidden).
    showStartMove?: boolean;          // Whether to display the option to navigate to the initial state of the game.
    fallbackComponent?: ReactElement; // Component that is rendered in case of no data
}

export type MovesHistoryHandlerI = {
    (moveID: number): void
}