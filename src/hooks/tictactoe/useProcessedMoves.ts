import {useMemo} from "react";
// Models
import {GameMoveI} from "models/tictactoe/game";
import {SortTypes} from "utils/sorting";
import {HistoryMoveI} from "components/Tictactoe/Moves/HistoryList/HistoryList.types";
// Hooks
import useMediaQueryContext from "hooks/useMediaQueryContext";

export interface ProcessedMovesConfigI {
    movesHistory: GameMoveI[];
    sortOrder: SortTypes;
}

export interface ProcessedMovesResultI {
    movesForDisplay: HistoryMoveI[];
    canShowDate: boolean;
}

/**
 * Prepares and sorts the moves history for display to the MovesList component,
 * then caches the data to avoid re-preparation on each render.
 *
 * @param config
 */
const useProcessedMoves = (config: ProcessedMovesConfigI): ProcessedMovesResultI => {
    // Screen sizes: mobile (max-width: 424px) and compact tablet (600px-768px)
    const { mobileMView, tabletMView } = useMediaQueryContext();

    const asc = (prev: GameMoveI, next: GameMoveI) =>
        prev.moveNumber - next.moveNumber;
    const desc = (prev: GameMoveI, next: GameMoveI) =>
        next.moveNumber - prev.moveNumber;

    // Cache history moves to avoid re-preparation and sorting on each render
    const preparedMoves: HistoryMoveI[] = useMemo(() => {
        return config.movesHistory
            .slice()                                                 // Copy move history to avoid mutating original data.
            .sort(config.sortOrder === SortTypes.Asc ? asc : desc)
            .map(move => Object.assign({
                id: move.moveNumber,
                date: new Date(move.date),
                squareID: move.squareID
            }));
    }, [config.movesHistory, config.sortOrder]);

    return {
        movesForDisplay: preparedMoves,
        canShowDate: !(mobileMView || tabletMView), // Show date for large mobile screens and medium or larger tablets
    };
};
export default useProcessedMoves;