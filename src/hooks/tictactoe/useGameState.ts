import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
// Models
import { AsyncStateI } from 'models/common';
import { GameStateContainerI } from 'store/tictactoe/game/types';
// Redux
import { restoreGame } from 'store/tictactoe/game/gameSlice';
import { AppDispatch } from 'store';
// Hooks
import { useTypedSelector } from 'hooks/useTypedSelector';
// Utils and Services
import { normalizeError } from 'utils/error';
import { getLastGameState } from 'services/tictactoe/gameState';

export interface GameStateResultI extends AsyncStateI {
	stateContainer: GameStateContainerI;
}

const useGameState = <T>(gameID: T): GameStateResultI => {
	const dispatch = useDispatch<AppDispatch>();
	const stateContainer = useTypedSelector((state) => state.t3game);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const loadGameState = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const lastState = await getLastGameState<T>(gameID);
			if (lastState) {
				dispatch(restoreGame(lastState));
			}
		} catch (error: unknown) {
			setError(normalizeError(error, 'Failed to load game state.'));
		} finally {
			setLoading(false);
		}
	}, [dispatch, gameID]);

	useEffect(() => {
		// NOTE: The async function 'loadGame' is called inside useEffect without waiting for the Promise to resolve.
		// This is a workaround to avoid unhandled Promise warnings in React.
		// It might be worth revisiting this if we need to properly handle the Promise result or improve error handling in the future.
		loadGameState();
	}, [loadGameState]);

	return {
		stateContainer,
		loading,
		error,
	};
};
export default useGameState;
