import {FC, ReactElement, useMemo, useState} from "react";
import {useDispatch} from "react-redux";

import {PlayerI} from "../../../models/player";
import {GameMoveI, GameStateI, SquareState, WinnerState} from "../../../models/tictactoe/game";
import {updateCurrentMove, updateHistoryMove} from "../../../redux/tictactoe/game/gameSlice";
import {AppDispatch} from "../../../redux/store";

import Board, {BoardElHandlerType, SquareType} from "../Board/Board";
import MovesHistory, {HistoryMoveI} from "../MovesHistory/MovesHistory";
import NextMoveStatus from "./Status/NextMove";
import DrawStatus from "./Status/Draw";
import VictoryStatus from "./Status/Victory";

import './Game.css';

export interface GamePropsI {
    gameState: GameStateI
}

const Game: FC<GamePropsI> = ({gameState}) =>  {
    const boardColumns: number = 3; // number of columns on the game Board

    const dispatch = useDispatch<AppDispatch>();
    const move = gameState.currentMove;
    const moveHistory = gameState.history;
    const [numberMoves, setNumberMoves] = useState<number>(moveHistory.length); // required to cache the move history render

    /**
     * Element selection handler on the Board
     * This syntax provides binding `this` inside
     * @param squareID
     */
    const boardHandler : BoardElHandlerType = (squareID: number): void => {
        makeMove(squareID);
    }

    /**
     * Get moves history
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
     * Return game state of the current move
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
     * Return the winner data or null from the game state
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

        // Overwrite the history to the current move (including)
        let nextMove = getMoveID() + 1;
        let history = getHistory().slice(0, nextMove);
        let squares = getSquares().slice();
        squares[squareID] = getPlayer();

        // Update state game
        dispatch(updateCurrentMove(nextMove));              // update current move number. Will be needed for move history
        setNumberMoves(history.length + 1);                 // used to cache the move history render
        dispatch(updateHistoryMove(                         // add the state of the step to the game history
            history.concat([{
                date: Date.now(),
                squareID: squareID,
                squares: squares,
                winner: calculateWinner(squares)             // we calculate the winner on each
            }])
        ));
    }

    /**
     * Calculates the game winner on the field
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
     * The Status of the game on the current move changes when moving through the history of moves
     */
    const renderStatus = (): ReactElement => {
        if (checkDraw()) {
            return <DrawStatus/>
        }
        const winner = getWinner();

        return winner ?
            <VictoryStatus player={winner.player}/> :
            <NextMoveStatus player={getPlayer()}/>
    }

    /**
     * Checks if there is currently a draw
     * The game Status changes when moving through the history of moves
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
    const prepareSquaresDisplay: () => SquareType[] = () => {
        return getSquares()
            .map(
                player => player === null ? player: player.name
            );
    }

    /*
    * Prepare the state of history moves for display
    */
    const prepareHistoryDisplay: () => HistoryMoveI[] = () => {
        return getHistory()
            .map((move, index) => Object.assign({
                id: index,
                date: new Date(move.date),
                squareID: move.squareID
            }));
    };

    // Data for display is cached and updates when the state changes (moves history, current move)
    const squaresDisplay = useMemo<SquareType[]>(
        prepareSquaresDisplay, [moveHistory, move]
    );

    // Rerender only when the number of moves changes
    const historyDisplay = useMemo<HistoryMoveI[]>(
        prepareHistoryDisplay, [numberMoves]
    );

    return (
        <div id="t3-game" className="game">
            <div className="game-board">
                <Board columns={boardColumns}
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
                <MovesHistory moves={historyDisplay}
                           hasStartMove={true}
                           currentMove={getMoveID()}
                />
            </div>
        </div>
    );
}
export default Game;