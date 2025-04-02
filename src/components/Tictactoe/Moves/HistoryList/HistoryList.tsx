import {FC, ReactElement, useLayoutEffect, useRef} from "react";
import {useDispatch} from "react-redux";
// Models
import {
    HistoryListProps,
    HistoryMoveI,
    MovesHistoryHandlerI
} from "components/Tictactoe/Moves/HistoryList/HistoryList.types";
// Redux
import {AppDispatch} from "../../../../redux/store";
import {goToMove} from "../../../../redux/tictactoe/game/gameSlice";
// Components
import EmptyListMessage from "components/Common/EmptyListMessage/EmptyListMessage";
import DefaultMove from "components/Tictactoe/Moves/HistoryList/DefaultMove/DefaultMove";
import Move from "components/Tictactoe/Moves/HistoryList/Move/Move";

import "components/Tictactoe/Moves/HistoryList/HistoryList.css";

const HistoryList: FC<HistoryListProps> = ({ moves, currentMove, canShowDate = true, fallbackComponent = (<EmptyListMessage/>)}) => {
    const dispatch = useDispatch<AppDispatch>();
    const scrollRef = useRef<HTMLDivElement>(null);   // Container where scrolling occurs.
    const movesRef = useRef<HTMLLIElement[]>([]);     // List of elements that can be scrolled to.

    // Auto-scrolling to the active move history item
    // useLayoutEffect ensures that scrolling is performed before any changes are rendered on the screen,
    // allowing for controlled scrolling without delays or visual issues.
    useLayoutEffect(() => {
        scrollToMove(currentMove);
    }, [currentMove, moves]);

    /**
     * @param id
     * @param element
     */
    const setMoveRef = (id: number, element: HTMLLIElement | null): void => {
        // Ensures no duplicate DOM elements in itemRefs
        if (element && !movesRef.current.includes(element)) {
            movesRef.current[id] = element;
        }
    };

    /**
     * Handler on change the history move
     * @param id
     */
    const moveHandler: MovesHistoryHandlerI = (id: number): void => {
        dispatch(goToMove(id));
    }

    /**
     * Smoothly scrolls the move history container to the specified move (index move)
     * @param index
     */
    const scrollToMove = (index: number): void => {
        const target: HTMLLIElement = movesRef.current[index];
        const container = scrollRef.current; // Link to container where scrolling occurs.

        if (target && container) {
            container.scrollTo({
                top: target.offsetTop - container.offsetTop,
                behavior: "smooth",
            });
        }
    };

    /**
     * @param move
     */
    const renderMove = (move: HistoryMoveI): ReactElement => {
        return (
            <Move
                ref={element => setMoveRef(move.id, element)}
                id={move.id}
                key={move.id}
                date={move.date}
                squareID={move.squareID}
                isSelected={currentMove === move.id}
                canShowDate={canShowDate}
                onClick={moveHandler}
            />
        );
    };

    /**
     * Start of the Game, players haven't yet walked
     */
    const renderDefaultMove = (): ReactElement => {
        return (
            <DefaultMove
                key={0}
                selected={currentMove === 0}
                onClick={moveHandler}
            />
        );
    };

    // Displays a message informing the user that the move history is empty.
    if (moves.length === 0) {
        return (fallbackComponent);
    }

    return (
        <div ref={scrollRef} className="history-list">
            <ol>
                {moves.map(move => move.id === 0
                    ? renderDefaultMove()
                    : renderMove(move)
                )}
            </ol>
        </div>
    );
};
export default HistoryList;