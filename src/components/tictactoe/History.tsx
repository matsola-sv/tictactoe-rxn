import {FC, ReactElement, useState} from "react";
import {SortTypes} from "../../utils/sort";

import {T3GameMoveI as T3MoveI} from "./Game";
import T3HistoryMove from "./history/Move";
import T3HistoryDefaultMove from "./history/DefaultMove";
import SortBar, {SortBarHandlerI} from "../common/list/SortBar";

export type T3HistoryHandlerI = {
    (moveID: number): void
}

export interface T3HistoryPropsI {
    hasStartMove?: boolean,             // start of game without player moves
    currentMove: number,
    moves: T3MoveI[],
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
    const renderMove = (move: T3MoveI): ReactElement => {
        return (
            <T3HistoryMove id={move.id}
                         key={move.id}
                         date={move.date}
                         squareID={move.squareID}
                         player={move.player}
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
    const getSortedMoves = (): T3MoveI[] => {
        let asc = (prev: T3MoveI, next: T3MoveI) =>
            prev.date - next.date;
        let desc = (prev: T3MoveI, next: T3MoveI) =>
            next.date - prev.date;

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