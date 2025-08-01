import { FC, ReactElement } from 'react';
// Models
import { GameStateI } from 'models/tictactoe/game';
import { GameStatus } from 'models/tictactoe/gameStatus';
// Hooks and services
import useGameResult, { GameResultI } from 'hooks/tictactoe/useGameResult';
import { getCurrentPlayer } from 'services/tictactoe/gameLogic';
// Components
import ActionIndicators from 'components/Tictactoe/ActionIndicators/ActionIndicators';
import DrawStatus from 'components/Tictactoe/Game/Status/Draw/DrawStatus';
import NextMoveStatus from 'components/Tictactoe/Game/Status/NextMove/NextMoveStatus';
import VictoryStatus from 'components/Tictactoe/Game/Status/Victory/VictoryStatus';
import ViewingHistory from 'components/Tictactoe/Game/Status/ViewingHistory/ViewingHistoryStatus';

import 'components/Tictactoe/Game/Status/Status.css';

interface StatusPropsI {
	gameState: GameStateI;
}

/**
 * The Status of the game on the current move changes when moving through the history of moves
 * @param gameState
 * @constructor
 */
const Status: FC<StatusPropsI> = ({ gameState }) => {
	const gameResult: GameResultI = useGameResult({ gameState: gameState });
	const status: GameStatus = gameState.status;

	/**
	 * Note: no need for useCallback here, since renderStatus is only called during rendering
	 * and does not get passed as a prop or used elsewhere where memoization would provide a benefit.
	 */
	const renderStatus = (): ReactElement => {
		if (status === GameStatus.ViewingHistory) {
			return (
				<ViewingHistory
					statusComponent={<NextMoveStatus player={getCurrentPlayer(gameState)} />}
				/>
			);
		}

		if (gameResult.isDraw) {
			return <DrawStatus />;
		}

		return gameResult.winner ? (
			<VictoryStatus player={gameResult.winner.player} />
		) : (
			<NextMoveStatus player={getCurrentPlayer(gameState)} />
		);
	};

	return (
		<div className='t3-status-wrapper'>
			<ActionIndicators />
			<div className='t3-status__body'>{renderStatus()}</div>
		</div>
	);
};
export default Status;
