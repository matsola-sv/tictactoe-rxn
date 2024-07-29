import {FC, ReactElement, useEffect, useMemo, useState} from "react";
import '../../assets/css/TicTacToe.css';

import {PlayerI} from "../../models/player";
import T3Board, {T3BoardElHandlerI, T3SquareType} from "./Board";
import T3History, {T3HistoryHandlerI, T3HistoryMoveI} from "./History";
import T3NextMoveStatus from "./game/status/NextMove";
import T3DrawStatus from "./game/status/Draw";
import T3VictoryStatus from "./game/status/Victory";

export interface T3GameProps {
    gameState?: T3GameStateI | null
}

export interface T3GameStateI {
    history: T3GameMoveI[],
    activeMove: number                              // number of the current move. Default = 0
}

interface T3GameMoveI {
    date: number,                                   // the timestamp when the move occurred
    squares: T3SquareState[],                       // the state of the squares on the current move
    squareID: number | null,		                // in which square the move is made (ID). You can find out who made the move squares[squareID]
    winner: T3WinnerState                           // game winner if there is one
}

interface T3WinnerI {
    player: PlayerI,
    winnerLine: number[]
}

type T3SquareState = PlayerI | null;
type T3WinnerState = T3WinnerI | null;

const T3Game: FC<T3GameProps> = (props) =>  {
    const boardColumns: number = 3;                  // number of columns on the game board
    const players: PlayerI[] = [                     // player with the index (0) goes first
        { id: 1, name: "X" },
        { id: 2, name: "O" }
    ];
    const defaultMove: T3GameMoveI = {
        date: Date.now(),                            // the date of the move
        squareID: null,                              // current square id
        squares: Array(9).fill(null),                // list of squares and moves in them
        winner: null
    };

    /**
     * Returned the passed or the default state
     */
    const loadedState: T3GameStateI = useMemo(() => {
        return props?.gameState ?? {
            history: [defaultMove], activeMove: 0
        }
    }, [props.gameState]);

    const [move, setMove] = useState<number>(loadedState.activeMove);                       // current move number
    const [moveHistory, setMoveHistory] = useState<T3GameMoveI[]>(loadedState.history);
    const [numberMoves, setNumberMoves] = useState<number>(moveHistory.length);             // required to cache the move history render

    /**
     * Update game states
     */
    useEffect(() => {
        setMove(loadedState.activeMove);
        setMoveHistory(loadedState.history);
        setNumberMoves(loadedState.history.length);
    }, [props.gameState]);

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
     * Get moves history
     */
    const getHistory = (): T3GameMoveI[] => {
        return moveHistory;
    }

    /**
     * Return current (active) move number (from 0-9).
     * 0 - starting position, 2 - two players have already completed 1 move
     */
    const getMoveID = (): number => {
        return move;
    }

    /**
     * Return game state of the current move
     */
    const getMove = (): T3GameMoveI => {
        return getHistory()[getMoveID()]
    }

    /**
     * Get squares on current move or for the passed move
     */
    const getSquares = (move?: T3GameMoveI): T3SquareState[] => {
        return (move ?? getMove())
            .squares;
    }

    /**
     * Get the square value (player name or null) on current move
     * @param id
     */
    const getSquare = (id: number): T3SquareState => {
        return getSquares()[id];
    }

    /**
     * Return current square ID on the active move
     */
    const getActiveSquareID = (): number | null => {
        return getMove().squareID;
    }

    /**
     * Get player name on the current move
     */
    const getPlayer = (): PlayerI => {
        return getMoveID() %2 === 0 ?
            players[0] : players[1];
    }

    /**
     * Return the winner data or null from the game state
     */
    const getWinner = (): T3WinnerState => {
        return getMove().winner;
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
        setNumberMoves(history.length + 1);       // used to cache the move history render
        setMoveHistory(                           // add the state of the step to the game history
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
    const calculateWinner = (squares: T3SquareState[]): T3WinnerState => {
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
                    player: squares[a] as PlayerI,
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

    /*
    * Prepare the state of squares for display
    * Not all squares state data needs to be known by the component to render the squares
    */
    const prepareSquaresDisplay: () => T3SquareType[] = () => {
        return getSquares()
            .map(
                player => player === null ? player: player.name
            );
    }

    /*
    * Prepare the state of history moves for display
    */
    const prepareHistoryDisplay: () => T3HistoryMoveI[] = () => {
        return getHistory()
            .map((move, index) => Object.assign({
                id: index,
                date: new Date(move.date),
                squareID: move.squareID
            }));
    };

    // Data for display is cached and updates when the state changes (moves history, current move)
    const squaresDisplay = useMemo<T3SquareType[]>(
        prepareSquaresDisplay, [moveHistory, move]
    );

    // Rerender only when the number of moves changes
    const historyDisplay = useMemo<T3HistoryMoveI[]>(
        prepareHistoryDisplay, [numberMoves]
    );

    return (
        <div id="t3-game" className="game">
            <div className="game-board">
                <T3Board columns={boardColumns}
                         squares={squaresDisplay}
                         selected={getActiveSquareID()}
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
                <T3History moves={historyDisplay}
                           hasStartMove={true}
                           currentMove={getMoveID()}
                           onClick={historyMoveHandler}
                />
            </div>
        </div>
    );
}
export default T3Game;