import {FC, ReactElement} from "react";
import {T3GameMoveI} from "./game";
import {T3HistoryMove} from "./history/move";
import {T3HistoryDefaultMove as T3DefaultMove} from "./history/defaultMove";

export type T3HistoryHandlerI = {
    (moveID: number): void
}

export interface T3HistoryPropsI {
    hasStartMove?: boolean,             // start of game without player moves
    currentMove: number,
    moves: T3GameMoveI[],
    onClick: T3HistoryHandlerI
}

export const T3History: FC<T3HistoryPropsI> = (props) => {
    // Set default props
    const { hasStartMove = false }: T3HistoryPropsI = props;

    const moveHandler: T3HistoryHandlerI = (id: number) => {
    }

    /**
     * @param move
     */
    const renderMove = (move: T3GameMoveI): ReactElement => {
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
            <T3DefaultMove key={0}
                           selected={props.currentMove === 0}
            />
        );
    };

    const moves: ReactElement[] = props.moves
        .map(move => !move.id && hasStartMove ?
            renderDefaultMove() :
            renderMove(move)
        );

    return (
        <div id="moves-history">
            <ol>{moves}</ol>
        </div>
    )
}