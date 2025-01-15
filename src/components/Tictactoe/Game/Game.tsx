import {FC, ReactElement, useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";

// Models
import {PlayerI} from "../../../models/player";
import {GameStatus} from "../../../models/tictactoe/gameStatus";
import {BoardElHandlerType, SquareType} from "../Board/Board.types";
import {
    GameMoveI,
    GameMoveState,
    GameStateI,
    HistoryMoveI,
    SquareState,
    WinnerState
} from "../../../models/tictactoe/game";

// Redux
import {makeMove as reduxMakeMove} from "../../../redux/tictactoe/game/gameSlice";
import {AppDispatch} from "../../../redux/store";

// Services
import {calculateWinner, getCurrentPlayer} from "../../../services/tictactoe/gameLogic";

// Components
import EmptyListMessage from "../../Common/EmptyListMessage/EmptyListMessage";
import GameStopwatch from "../GameStopwatch/GameStopwatch";
import GameMenu from "../GameMenu/GameMenu";
import Board from "../Board/Board";
import Status from "./Status/Status";
import MovesHistory from "../MovesHistory/MovesHistory";

import './Game.css';

interface GamePropsI {
    gameState: GameStateI;
    boardColumns?: number; // Number of columns on the game board
}

const Game: FC<GamePropsI> = ({ gameState, boardColumns = 3 }) =>  {
    const fallbackBoard: ReactElement = (
        <EmptyListMessage
            message="It's empty here, like in space. No cells found!"
        />
    );
    const fallbackMoveHistory: ReactElement = (
        <EmptyListMessage
            message="The game is a blank slate! Make your first move and create history."
        />
    );

    // Game state in Redux
    const dispatch = useDispatch<AppDispatch>();
    const move: number = gameState.currentMove;
    const moveHistory: GameMoveI[] = gameState.history;
    const status = gameState.status;                                // Game status
    const initialMillis = gameState.time.durationSecs * 1000;       // Initial mills for stopwatch

    // Game statuses
    const isStopped: boolean = status === GameStatus.Stopped;       // Checks if the game has stopped
    const isPaused: boolean = status === GameStatus.Paused;         // The game is paused
    const isViewingHistory = status === GameStatus.ViewingHistory;  // Checks if the game is in the process of viewing the history of moves.

    // Local state
    const [numberMoves, setNumberMoves] = useState<number>(moveHistory.length);  // Required to cache the move history render
    const isShowGameMenu: boolean = true;

    // Updates the number of moves in the history, required for memorizing the move history.
    useEffect(() => {
        setNumberMoves(moveHistory.length);
    }, [moveHistory]);

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
    const getMove = (): GameMoveState => {
        return getHistory()[getMoveID()] ?? null;
    }

    /**
     * Get squares on current move or for the passed move
     */
    const getSquares = (move?: GameMoveI): SquareState[] => {
        return (move ?? getMove())
            ?.squares ?? [];
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
        return getMove()?.squareID ?? null;
    }

    /**
     * Get player name on the current move
     * Player with the index (0) goes first
     */
    const getPlayer = (): PlayerI => {
        return getCurrentPlayer(gameState);
    }

    /**
     * Return the winner data or null from the game state
     */
    const getWinner = (): WinnerState => {
        return getMove()?.winner ?? null;
    }

    /**
     * Checks if a move can be made based on the current game status.
     *
     * @param status - The current status of the game.
     */
    const canMakeMove = (status: GameStatus) => {
        return status === GameStatus.Running || status === GameStatus.Waiting;
    };

    /**
     * @param squareID
     */
    const makeMove = (squareID: number): void => {
        // Check if it is possible to make a move (if the game is stopped or the cell is already occupied)
        if (isStopped || isViewingHistory || getSquare(squareID)) {
            return;
        }

        // Overwrite the history to the current move (including)
        let nextMove = getMoveID() + 1;
        let history = getHistory().slice(0, nextMove);
        let squares = getSquares().slice();
        squares[squareID] = getPlayer();

        // Update state game in Redux
        setNumberMoves(history.length + 1);                 // Used to cache the move history render
        dispatch(reduxMakeMove({
            // Update current move number. Will be needed for move history
            currentMove: nextMove,

            // Add the state of the step to the game history
            history: history.concat([{
                date: Date.now(),
                squareID: squareID,
                squares: squares,
                winner: calculateWinner(squares)            // We calculate the winner on each
            }])
        }));
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
    // getSquares depends on move and moveHistory, as these data determine the state of squares for the current move,
    // so it's not necessary to include it in the dependencies.
    const squaresDisplay = useMemo<SquareType[]>(
        prepareSquaresDisplay, [moveHistory, move] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // Rerender only when the number of moves changes
    // Relying on numberMoves as it reflects moveHistory changes; avoids unnecessary recalculations.
    const historyDisplay = useMemo<HistoryMoveI[]>(
        prepareHistoryDisplay, [numberMoves] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <div id="t3-game" className="game-container">
            {/* Left column */}
            <div className="game-left">
                <div className="menu-container">
                    <GameMenu isDisabled={!isShowGameMenu}/>
                </div>
                <div className="board-container">
                    <Board
                        isDisabled={isPaused}
                        isClickable={canMakeMove(status)}
                        columns={boardColumns}
                        squares={squaresDisplay}
                        selected={getActiveSquareID()}
                        onClick={boardHandler}
                        selectedLine={getWinner()?.winnerLine}
                        fallbackComponent={fallbackBoard}
                    />
                </div>
                <div className="game-tools">
                    <GameStopwatch initialMillis={initialMillis}/>
                </div>
            </div>

            {/* Right column */}
            <div className="game-right">
                <div className="game-info">
                    <Status gameState={gameState}/>
                    <MovesHistory
                        moves={historyDisplay}
                        currentMove={getMoveID()}
                        fallbackComponent={fallbackMoveHistory}
                    />
                </div>
            </div>
        </div>
    );
}
export default Game;