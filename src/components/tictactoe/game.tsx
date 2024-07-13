import '../../assets/css/TicTacToe.css';
import {T3Board} from "./board";
import {T3SquareType} from "./board/square";
import {FC, useState} from "react";

interface T3GameState {
    squareId: number | null, // current square id
    squares: T3SquareType[]
}

export const T3Game: FC = () =>  {
    const boardColumns = 3;                      // number of columns on the game board
    const defaultState: T3GameState = {
        squareId: 4,                             // current square id
        squares: Array(9).fill(T3SquareType.X)   // list of squares and moves in them
    };

    const [moveState, setMoveState] = useState<T3GameState>(defaultState);

    /**
     * This syntax provides binding `this` inside
     * @param squareID
     */
    const handlerClick = (squareID: number): void => {
        makeMove(squareID);
    }

    /**
     * Get current square ID on the current move
     * @returns {null|*}
     */
    const getSquareID = () => {
        return moveState.squareId;
    }

    /**
     * Get squares on current move or for the passed move
     */
    const getSquares = (): T3SquareType[] => {
        return moveState.squares;
    }

    /**
     * @param squareId
     */
    const makeMove = (squareId: number): void => {
        // Update selected square in game state
        setMoveState({
            ...moveState,
            ...{ squareId: squareId }
        });
    }

    return (
        <div className="game">
            <div className="game-board">
                <T3Board columns={boardColumns}
                         squares={getSquares()}
                         selected={getSquareID()}
                         onClick={handlerClick}
                         selectedLine={[]}
                />
            </div>

        </div>
    );
}