import {FC, ReactElement, useMemo, useState} from "react";
import {useDispatch} from "react-redux";

import {PlayerI} from "../../../models/player";
import {GameMoveI, GameStateI, SquareState, WinnerState} from "../../../models/tictactoe/game";
import {updateCurrentMove, updateHistoryMove} from "../../../redux/tictactoe/game/gameSlice";
import {AppDispatch} from "../../../redux/store";

import T3Board, {T3BoardElHandlerI, T3SquareType} from "../Board/Board";
import T3History, {HistoryMoveI} from "../History/History";
import T3NextMoveStatus from "./Status/NextMove";
import T3DrawStatus from "./Status/Draw";
import T3VictoryStatus from "./Status/Victory";

import './Game.css';

export interface T3GamePropsI {
    gameState: GameStateI
}

const T3Game: FC<T3GamePropsI> = ({gameState}) =>  {
    const boardColumns: number = 3; // number of columns on the Game Board

    const dispatch = useDispatch<AppDispatch>();
    const move = gameState.currentMove;
    const moveHistory = gameState.history;
    const [numberMoves, setNumberMoves] = useState<number>(moveHistory.length); // required to cache the move History render

    /**
     * Element selection handler on the Board
     * This syntax provides binding `this` inside
     * @param squareID
     */
    const boardHandler : T3BoardElHandlerI = (squareID: number): void => {
        makeMove(squareID);
    }

    /**
     * Get moves History
     */
    const getHistory = (): GameMoveI[] => {
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
     * Return Game state of the current move
     */
    const getMove = (): GameMoveI => {
        return getHistory()[getMoveID()]
    }

    /**
     * Get squares on current move or for the passed move
     */
    const getSquares = (move?: GameMoveI): SquareState[] => {
        return (move ?? getMove())
            .squares;
    }

    /**
     * Get the square value (player name or null) on current move
     * @param id
     */
    const getSquare = (id: number): SquareState => {
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
     * Player with the index (0) goes first
     */
    const getPlayer = (): PlayerI => {
        return getMoveID() %2 === 0 ?
            gameState.players[0] : gameState.players[1];
    }

    /**
     * Return the winner data or null from the Game state
     */
    const getWinner = (): WinnerState => {
        return getMove().winner;
    }

    /**
     * @param squareID
     */
    const makeMove = (squareID: number): void => {
        if (getWinner() || getSquare(squareID)) {
            return;
        }

        // Overwrite the History to the current move (including)
        let nextMove = getMoveID() + 1;
        let history = getHistory().slice(0, nextMove);
        let squares = getSquares().slice();
        squares[squareID] = getPlayer();

        // Update state Game
        dispatch(updateCurrentMove(nextMove));              // update current move number. Will be needed for move History
        setNumberMoves(history.length + 1);                 // used to cache the move History render
        dispatch(updateHistoryMove(                         // add the state of the step to the Game History
            history.concat([{
                date: Date.now(),
                squareID: squareID,
                squares: squares,
                winner: calculateWinner(squares)             // we calculate the winner on each
            }])
        ));
    }

    /**
     * Calculates the Game winner on the field
     * @param squares
     */
    const calculateWinner = (squares: SquareState[]): WinnerState => {
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
     * The Status of the Game on the current move changes when moving through the History of moves
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
     * The Game Status changes when moving through the History of moves
     */
    const checkDraw = (): boolean => {
        // moves end when current move-id(from 0-9) == the number of all squares on the field (9)
        // there may be only 10 moves, but we moved History to current move(2), so moves won't be finished
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
    * Prepare the state of History moves for display
    */
    const prepareHistoryDisplay: () => HistoryMoveI[] = () => {
        return getHistory()
            .map((move, index) => Object.assign({
                id: index,
                date: new Date(move.date),
                squareID: move.squareID
            }));
    };

    // Data for display is cached and updates when the state changes (moves History, current move)
    const squaresDisplay = useMemo<T3SquareType[]>(
        prepareSquaresDisplay, [moveHistory, move]
    );

    // Rerender only when the number of moves changes
    const historyDisplay = useMemo<HistoryMoveI[]>(
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
                />
            </div>
        </div>
    );
}
export default T3Game;