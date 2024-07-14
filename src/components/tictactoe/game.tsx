import {FC, ReactElement, useState} from "react";
import '../../assets/css/TicTacToe.css';

import {T3Board, T3BoardElHandlerI, T3SquareType} from "./board";
import {T3NextMoveStatus} from "./game/status/nextMove";
import {T3VictoryStatus} from "./game/status/victory";
import {T3DrawStatus} from "./game/status/draw";
import {T3History, T3HistoryHandlerI} from "./history";

/**
 * You can use the date as the id, but there is one plus in using the id as a sequence number:
 * It is easy to find the first element (id = 0)
 */
export interface T3GameMoveI {
    id: number,
    date: number,
    squareID: number,
    player: T3PlayerI
}

export interface T3PlayerI {
    id: number,
    name: string
}

interface T3GameStateI {
    date: number,                                    // the timestamp
    squareID: number | null,                         // current square id === null - start of game without player moves
    squares: T3SquareStateI[],                       // squares state
    winner:  T3WinnerI,
}

type T3SquareStateI = T3PlayerI | null;              // interface of the contents (void or player) of the square in the game

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
    const moveState: T3GameStateI = {
        date: Date.now(),                            // the date(timestamp) of the move
        squareID: null,                              // current square id
        squares: Array(9).fill(null),                // list of squares and moves in them
        winner: null
    };

    const [move, setMove] = useState<number>(0);     // current move id
    const [movesHistory, setMovesHistory] = useState<T3GameStateI[]>([moveState]);

    /**
     * Element selection handler on the board
     * This syntax provides binding `this` inside
     * @param squareID
     */
    const boardHandler : T3BoardElHandlerI = (squareID: number): void => {
        makeMove(squareID);
    }

    /**
     * @param moveID
     */
    const historyMoveHandler: T3HistoryHandlerI = (moveID: number): void => {
        jumpToMove(moveID);
    }

    /**
     * Get squares on current move or for the passed move
     */
    const getSquares = (move?: T3GameStateI): T3SquareStateI[] => {
        return (move ?? getMove())
            .squares;
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
        return moveState.squareID;
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
        return getHistory()[getMoveID()]
    }

    /**
     * Return the winner data or null from the game state
     */
    const getWinner = (): T3WinnerI => {
        return getMove().winner;
    }

    /**
     * Get moves history
     */
    const getHistory = (): T3GameStateI[] => {
        return movesHistory;
    }

    /**
     * @param squareID
     */
    const makeMove = (squareID: number): void => {
        if (getWinner() || getSquare(squareID)) {
            return;
        }

        // Overwrite the history to the current move (including)
        let nextMove = getMoveID() + 1;
        let history = getHistory().slice(0, nextMove);
        let squares = getSquares().slice();
        squares[squareID] = getPlayer();

        // Update state game
        setMove(nextMove);                        // update current move number. Will be needed for move history
        setMovesHistory(                          // add the state of the step to the game history
            history.concat([{
                date: Date.now(),
                squareID: squareID,
                squares: squares,
                winner: calculateWinner(squares)  // we calculate the winner on each
            }])
        );
    }

    /**
     * Jump to the game state by move number
     * @param moveId
     */
    const jumpToMove = (moveId: number): void => {
        if (getMoveID() !== moveId) {
            setMove( moveId );
        }
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

    // Prepare history moves before rendering
    const moves: T3GameMoveI[] = getHistory()
        .map((move, index) => Object.assign({
            id: index,
            date: move.date,
            squareID: move.squareID,
            player: getSquare(
                move.squareID ?? 0 // squareID = null - start of game without player moves
            )
        }));

    return (
        <div id="t3-game" className="game">
            <div className="game-board">
                <T3Board columns={boardColumns}
                         squares={preparedSquares}
                         selected={getCurrentSquareID()}
                         onClick={boardHandler}
                         selectedLine={getWinner()?.winnerLine}
                />
            </div>
            <div className="game-info">
                <div className="status">
                    <div className="text">
                        {renderStatus()}
                    </div>
                </div>
                <T3History moves={moves}
                           hasStartMove={true}
                           currentMove={getMoveID()}
                           onClick={historyMoveHandler}
                />
            </div>
        </div>
    );
}