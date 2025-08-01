import { FC, ReactElement, useMemo } from 'react';
import { useDispatch } from 'react-redux';
// Models
import { BoardElHandlerType, SquareType } from 'components/Tictactoe/Board/Board.types';
import { PlayerI } from 'models/player';
import {
	GameMoveI,
	GameMoveState,
	GameStateI,
	SquareState,
	WinnerState,
} from 'models/tictactoe/game';
import { GameStatus } from 'models/tictactoe/gameStatus';
import { UIElementSize } from 'models/ui';
// Redux
import { AppDispatch } from 'store';
import { makeMove as reduxMakeMove } from 'store/tictactoe/game/gameSlice';
// Services
import {
	calculateWinner,
	generateMoveNumber,
	getCurrentPlayer,
} from 'services/tictactoe/gameLogic';
//Hooks
import useProcessedMoves from 'hooks/tictactoe/useProcessedMoves';
import { useTypedSelector } from 'hooks/useTypedSelector';
// Components
import EmptyListMessage from 'components/Common/EmptyListMessage/EmptyListMessage';
import Board from 'components/Tictactoe/Board/Board';
import GameControls from 'components/Tictactoe/Controls/GameControls/GameControls';
import GameView from 'components/Tictactoe/Game/GameView/GameView';
import Status from 'components/Tictactoe/Game/Status/Status';
import GameStopwatch from 'components/Tictactoe/GameStopwatch//GameStopwatch';
import HistoryControls from 'components/Tictactoe/Moves/HistoryControls/HistoryControls';
import HistoryControlsMini from 'components/Tictactoe/Moves/HistoryControlsMini/HistoryControlsMini';
import HistoryList from 'components/Tictactoe/Moves/HistoryList/HistoryList';

interface GamePropsI {
	gameState: GameStateI;
	boardColumns: number; // Number of columns on the game board
}

/**
 *  NOTE:
 *  A component that encapsulates the game logic, manages the game state, prepares components for display,
 *  and delegates rendering to GameView, which decides what to render based on device type, screen size, etc.
 */
const Game: FC<GamePropsI> = ({ gameState, boardColumns }) => {
	// prettier-ignore
	const fallbackBoard: ReactElement = (
		<EmptyListMessage
			message="It's empty here, like in space. No cells found!" 
		/>
	);
	// prettier-ignore
	const fallbackMoveHistory: ReactElement = (
		<EmptyListMessage
			message="The game is a blank slate! Make your first move and create history."
		/>
	);

	// Game state in Redux
	const dispatch = useDispatch<AppDispatch>();
	const move: number = gameState.currentMove;
	const moveHistory: GameMoveI[] = gameState.history;
	const status = gameState.status; // Game status
	const initialMillis = gameState.time.durationSecs * 1000; // Initial mills for stopwatch

	// Player UI state
	const movesSort = useTypedSelector((state) => state.t3player.game.history.sorting);

	// Returns a prepared for displaying and sorted history of moves
	const { movesForDisplay, canShowDate: canShowMovesDate } = useProcessedMoves({
		movesHistory: moveHistory,
		sortOrder: movesSort.order,
	});

	// Game statuses
	const isStopped: boolean = status === GameStatus.Stopped; // Checks if the game has stopped
	const isPaused: boolean = status === GameStatus.Paused; // The game is paused
	const isViewingHistory = status === GameStatus.ViewingHistory; // Checks if the game is in the process of viewing the history of moves.

	/**
	 * Element selection handler on the Board
	 * This syntax provides binding `this` inside
	 * @param squareID
	 */
	const boardHandler: BoardElHandlerType = (squareID: number): void => {
		makeMove(squareID);
	};

	/**
	 * Get moves history
	 */
	const getHistory = (): GameMoveI[] => {
		return moveHistory;
	};

	/**
	 * Return current (active) move number (from 0-9).
	 * 0 - starting position, 2 - two players have already completed 1 move
	 */
	const getMoveID = (): number => {
		return move;
	};

	/**
	 * Return game state of the current move
	 */
	const getMove = (): GameMoveState => {
		return getHistory()[getMoveID()] ?? null;
	};

	/**
	 * Get squares on current move or for the passed move
	 */
	const getSquares = (move?: GameMoveI): SquareState[] => {
		return (move ?? getMove())?.squares ?? [];
	};

	/**
	 * Get the square value (player name or null) on current move
	 * @param id
	 */
	const getSquare = (id: number): SquareState => {
		return getSquares()[id];
	};

	/**
	 * Return current square ID on the active move
	 */
	const getActiveSquareID = (): number | null => {
		return getMove()?.squareID ?? null;
	};

	/**
	 * Get player name on the current move
	 * Player with the index (0) goes first
	 */
	const getPlayer = (): PlayerI => {
		return getCurrentPlayer(gameState);
	};

	/**
	 * Return the winner data or null from the game state
	 */
	const getWinner = (): WinnerState => {
		return getMove()?.winner ?? null;
	};

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
		dispatch(
			reduxMakeMove({
				// Update current move number. Will be needed for move history
				currentMove: nextMove,

				// Add the state of the step to the game history
				history: history.concat([
					{
						moveNumber: generateMoveNumber(history),
						date: Date.now(),
						squareID: squareID,
						squares: squares,
						winner: calculateWinner(squares), // We calculate the winner on each
					},
				]),
			}),
		);
	};

	/*
	 * Prepare the state of squares for display
	 * Not all squares state data needs to be known by the component to render the squares
	 */
	const prepareSquaresDisplay: () => SquareType[] = () => {
		return getSquares().map((player) => (player === null ? player : player.name));
	};

	// Data for display is cached and updates when the state changes (moves history, current move)
	// getSquares depends on move and moveHistory, as these data determine the state of squares for the current move,
	// so it's not necessary to include it in the dependencies.
	const squaresDisplay = useMemo<SquareType[]>(
		prepareSquaresDisplay,
		[moveHistory, move], // eslint-disable-line react-hooks/exhaustive-deps
	);

	return (
		<GameView
			components={{
				gameControls: {
					mobile: <GameControls controlSize={UIElementSize.M} />,
					desktop: <GameControls controlSize={UIElementSize.L} />,
				},
				gameStopwatch: <GameStopwatch initialMillis={initialMillis} />,
				gameStatus: <Status gameState={gameState} />,
				board: (
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
				),
				movesControls: {
					desktop: <HistoryControls />,
					mobile: <HistoryControlsMini />,
				},
				movesList: (
					<HistoryList
						moves={movesForDisplay}
						currentMove={getMoveID()}
						canShowDate={canShowMovesDate}
						fallbackComponent={fallbackMoveHistory}
					/>
				),
			}}
		/>
	);
};
export default Game;
