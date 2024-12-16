import {FC, ReactElement, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import classNames from "classnames";

// Models
import {SortTypes} from "../../../utils/sort";
import {HistoryMoveI} from "../../../models/tictactoe/game";
import {MovesHistoryHandlerI, MovesHistoryPropsI} from "./MoveHistory.types";

// Redux
import {AppDispatch} from "../../../redux/store";
import {goToMove} from "../../../redux/tictactoe/game/gameSlice";

import Move from "./Move/Move";
import DefaultMove from "./DefaultMove/DefaultMove";
import SortBar, {SortBarHandlerI} from "../../Common/List/SortBar/SortBar";

import './MovesHistory.css';

const MovesHistory: FC<MovesHistoryPropsI> = (props) => {
    // Set default props
    const { showStartMove = false, isDisabled = false }: MovesHistoryPropsI = props;

    const dispatch = useDispatch<AppDispatch>();
    const [sortOrder, setSortOrder] = useState<SortTypes>(SortTypes.Asc);

    /**
     * Handler on change the history move
     * @param id
     */
    const moveHandler: MovesHistoryHandlerI = (id: number) => {
        dispatch(goToMove(id));
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
    const renderMove = (move: HistoryMoveI): ReactElement => {
        return (
            <Move
                id={move.id}
                key={move.id}
                date={move.date}
                squareID={move.squareID}
                isSelected={props.currentMove === move.id}
                onClick={moveHandler}
            />
        );
    };

    /**
     * Start of the Game, players haven't yet walked
     */
    const renderDefaultMove = (): ReactElement => {
        return (
            <DefaultMove key={0}
                         selected={props.currentMove === 0}
                         onClick={moveHandler}
            />
        );
    };

    /**
     * Returns a sorted history of moves
     */
    const getSortedMoves = (): HistoryMoveI[] => {
        let asc = (prev: HistoryMoveI, next: HistoryMoveI) =>
            prev.date.getTime() - next.date.getTime();
        let desc = (prev: HistoryMoveI, next: HistoryMoveI) =>
            next.date.getTime() - prev.date.getTime();

        return props.moves.slice()
            .sort(
                sortOrder === SortTypes.Asc ? asc : desc
            );
    };

    // We sort when changing the List or sorting method
    const sortedItems = useMemo<HistoryMoveI[]>(
        getSortedMoves, [sortOrder, props.moves]
    );

    // Render List history moves
    const moves: ReactElement[] = sortedItems
        .map(move => !move.id && showStartMove ?
            renderDefaultMove() :
            renderMove(move)
        );

    return (
        <div id="moves-history" className="history-list">
            <div className="sort-bar-container">
                <SortBar
                    active={sortOrder}
                    onSort={sortHandler}
                />
            </div>
            <div className={classNames('moves-container', {'locked-element': isDisabled})}>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
export default MovesHistory;