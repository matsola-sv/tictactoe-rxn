import {FC, ReactElement, useState} from "react";
import {SortTypes} from "../../utils/sort";

import T3HistoryMove from "./history/Move";
import T3HistoryDefaultMove from "./history/DefaultMove";
import SortBar, {SortBarHandlerI} from "../common/list/SortBar";

export interface T3HistoryMoveI {
    id: number,
    date: Date,
    squareID: number,
}

export type T3HistoryHandlerI = {
    (moveID: number): void
}

export interface T3HistoryPropsI {
    hasStartMove?: boolean,             // start of game without player moves
    currentMove: number,
    moves: T3HistoryMoveI[],
    onClick: T3HistoryHandlerI
}

const T3History: FC<T3HistoryPropsI> = (props) => {
    // Set default props
    const { hasStartMove = false }: T3HistoryPropsI = props;

    const [sortOrder, setSortOrder] = useState<SortTypes>(SortTypes.Asc);

    /**
     * Handler on change the history move
     * @param id
     */
    const moveHandler: T3HistoryHandlerI = (id: number) => {
        props.onClick(id);
    }

    /**
     * Handler on change type sort
     * @param order
     */
    const sortHandler: SortBarHandlerI = (order) => {
        if (sortOrder !== order) {
            setSortOrder(order);
        }
    };

    /**
     * @param move
     */
    const renderMove = (move: T3HistoryMoveI): ReactElement => {
        return (
            <T3HistoryMove id={move.id}
                         key={move.id}
                         date={move.date}
                         squareID={move.squareID}
                         selected={props.currentMove === move.id}
                         onClick={moveHandler}
            />
        );
    };

    /**
     * Start of the game, players haven't yet walked
     */
    const renderDefaultMove = (): ReactElement => {
        return (
            <T3HistoryDefaultMove key={0}
                                  selected={props.currentMove === 0}
                                  onClick={moveHandler}
            />
        );
    };

    /**
     * Returns a sorted history of moves
     */
    const getSortedMoves = (): T3HistoryMoveI[] => {
        let asc = (prev: T3HistoryMoveI, next: T3HistoryMoveI) =>
            prev.date.getTime() - next.date.getTime();
        let desc = (prev: T3HistoryMoveI, next: T3HistoryMoveI) =>
            next.date.getTime() - prev.date.getTime();

        return props.moves.slice()
            .sort(
                sortOrder === SortTypes.Asc ? asc : desc
            );
    };

    // Render list history moves
    const moves: ReactElement[] = getSortedMoves()
        .map(move => !move.id && hasStartMove ?
            renderDefaultMove() :
            renderMove(move)
        );

    return (
        <div id="moves-history">
            <SortBar active={sortOrder}
                     onSort={sortHandler}
            />
            <ol>{moves}</ol>
        </div>
    )
}
export default T3History;