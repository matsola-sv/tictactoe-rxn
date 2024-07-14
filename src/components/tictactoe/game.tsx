import {FC, ReactElement, useState} from "react";
import '../../assets/css/TicTacToe.css';

import {T3Board, T3SquareType} from "./board";
import {T3NextMoveStatus} from "./game/status/nextMove";
import {T3VictoryStatus} from "./game/status/victory";
import {T3DrawStatus} from "./game/status/draw";

export interface T3PlayerI {
    id: number,
    name: string
}

interface T3GameStateI {
    squareId: number | null,                              // current square id
    squares: T3SquareStateI[],                            // squares state
    winner:  T3WinnerI,
}

type T3SquareStateI = T3PlayerI | null;

type T3WinnerI = null | {
    player: T3PlayerI,
    winnerLine: number[]                             // [square1, square2, square3]
};

export const T3Game: FC = () =>  {
    const boardColumns: number = 3;                  // number of columns on the game board
    const players: T3PlayerI[] = [                   // player with the index (0) goes first
        { id: 1, name: "X" },
        { id: 2, name: "O" }
    ];
    const defaultState: T3GameStateI = {
        squareId: null,                              // current square id
        squares: Array(9).fill(null),                // list of squares and moves in them
        winner: null
    };

    const [move, setMove] = useState(0);             // current move id
    const [moveState, setMoveState] = useState<T3GameStateI>(defaultState);

    /**
     * This syntax provides binding `this` inside
     * @param squareID
     */
    const handlerClick = (squareID: number): void => {
        makeMove(squareID);
    }

    /**
     * Get squares on current move or for the passed move
     */
    const getSquares = (): T3SquareStateI[] => {
        return moveState.squares;
    }

    /**
     * Get the square value (player name or null) on current move
     * @param id
     */
    const getSquare = (id: number): T3SquareStateI => {
        return getSquares()[id];
    }

    /**
     * Get current square ID on the current move
     */
    const getCurrentSquareID = (): number | null => {
        return moveState.squareId;
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
     * Return game state of the current move
     */
    const getMove = (): T3GameStateI => {
        return moveState;
    }

    /**
     * Return the winner data or null from the game state
     */
    const getWinner = (): T3WinnerI => {
        return getMove().winner;
    }

    /**
     * @param squareId
     */
    const makeMove = (squareId: number): void => {
        if (getWinner() || getSquare(squareId)) {
            return;
        }

        // Overwrite the history to the current move (including)
        let nextMove = getMoveID() + 1;
        let squares = getSquares().slice();
        squares[squareId] = getPlayer();

        // Update state game
        setMove(nextMove);                   // update current move number. Will be needed for move history
        setMoveState({                       // update the value in the current square
            squares: squares,
            squareId: squareId,
            winner: calculateWinner(squares) // we calculate the winner on each
        });
    }

    /**
     * Calculates the game winner on the field
     * @param squares
     */
    const calculateWinner = (squares: T3SquareStateI[]): T3WinnerI => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (squares[a] &&
                squares[a]?.id === squares[b]?.id &&
                squares[a]?.id === squares[c]?.id
            ) {
                return {
                    player: squares[a] as T3PlayerI,
                    winnerLine: lines[i]
                };
            }
        }
        return null;
    }

    /**
     * The status of the game on the current move changes when moving through the history of moves
     */
    const renderStatus = (): ReactElement => {
        if (checkDraw()) {
            return <T3DrawStatus/>
        }
        const winner = getWinner();

        return winner ?
            <T3VictoryStatus player={winner.player}/> :
            <T3NextMoveStatus player={getPlayer()}/>
    }

    /**
     * Checks if there is currently a draw
     * The game status changes when moving through the history of moves
     */
    const checkDraw = (): boolean => {
        // moves end when current move-id(from 0-9) == the number of all squares on the field (9)
        // there may be only 10 moves, but we moved history to current move(2), so moves won't be finished
        const movesEnded: boolean = getSquares().length
            === getMoveID();

        return !(!movesEnded || getMove().winner);
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
                         selectedLine={getWinner()?.winnerLine}
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