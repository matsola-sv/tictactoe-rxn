import {FC, ReactElement, useState} from "react";
import '../../assets/css/TicTacToe.css';
import {T3SquareType, T3Board} from "./board";
import {T3NextMoveStatus} from "./game/status/nextMove";

export interface T3PlayerI {
    name: string
}

interface T3GameStateI {
    squareId: number | null, // current square id
    squares: T3PlayerI[]
}

export const T3Game: FC = () =>  {
    const boardColumns: number = 3;                  // number of columns on the game board
    const players: T3PlayerI[] = [                   // player with the index (0) goes first
        { name: "X" },
        { name: "O" }
    ];
    const defaultState: T3GameStateI = {
        squareId: null,                              // current square id
        squares: Array(9).fill(null)   // list of squares and moves in them
    };

    const [move, setMove] = useState(0);              // current move id
    const [moveState, setMoveState] = useState<T3GameStateI>(defaultState);

    /**
     * This syntax provides binding `this` inside
     * @param squareID
     */
    const handlerClick = (squareID: number): void => {
        makeMove(squareID);
    }

    /**
     * Get the square value (player name or null) on current move
     * @param id
     */
    const getSquare = (id: number) => {
        return getSquares()[id];
    }

    /**
     * Get current square ID on the current move
     */
    const getCurrentSquareID = () => {
        return moveState.squareId;
    }

    /**
     * Get squares on current move or for the passed move
     */
    const getSquares = (): T3PlayerI[] => {
        return moveState.squares;
    }

    /**
     * Get player name on the current move
     */
    const getPlayer = (): T3PlayerI => {
        return getMoveID() %2 === 0 ?
            players[0] : players[1];
    }

    /**
     * Get current move id (from 0-9).
     * 0 - starting position, 2 - two players have already completed 1 move
     */
    const getMoveID = (): number => {
        return move;
    }

    /**
     * @param squareId
     */
    const makeMove = (squareId: number): void => {
        if (getSquare(squareId)) {
            return;
        }

        // Overwrite the history to the current move (including)
        let nextMove = getMoveID() + 1;
        let squares = getSquares().slice();
        squares[squareId] = getPlayer();

        // Update state game
        setMove(nextMove);   // update current move number. Will be needed for move history
        setMoveState({       // update the value in the current square
            squares: squares,
            squareId: squareId
        });
    }

    /**
     * The status of the game on the current move changes when moving through the history of moves
     */
    const renderStatus = (): ReactElement => {
        return <T3NextMoveStatus player={getPlayer()}/>
    }

    // Prepare squares before rendering
    const preparedSquares: T3SquareType[] = getSquares()
        .map(player => player === null ? player: player.name);

    return (
        <div className="game">
            <div className="game-board">
                <T3Board columns={boardColumns}
                         squares={preparedSquares}
                         selected={getCurrentSquareID()}
                         onClick={handlerClick}
                         selectedLine={[]}
                />
            </div>
            <div className="game-info">
                <div className="status">
                    <div className="text">
                        {renderStatus()}
                    </div>
                </div>
            </div>
        </div>
    );
}