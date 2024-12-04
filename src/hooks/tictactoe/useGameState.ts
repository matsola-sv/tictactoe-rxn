import {useDispatch} from "react-redux";
import {useCallback, useEffect, useState} from "react";

import {AsyncStateI} from "../../models/common";
import {GameStateContainerI} from "../../redux/tictactoe/game/types";

import {restoreGameState} from "../../redux/tictactoe/game/gameSlice";
import {AppDispatch} from "../../redux/store";

import {useTypedSelector} from "../useTypedSelector";

import {GameStateService} from "../../services/tictactoe/gameState";
import {normalizeError} from "../../utils/error";

export interface GameStateResultI extends AsyncStateI {
    stateContainer: GameStateContainerI
}

const useGameState = <T>(gameID: T): GameStateResultI => {
    const dispatch = useDispatch<AppDispatch>();
    const stateContainer = useTypedSelector(state => state.t3game);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadGameState = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const gameService = new GameStateService();
            const lastState = await gameService.getLastState<T>(gameID);

            if (lastState) {
                dispatch(restoreGameState(lastState));
            }
        } catch (error: unknown) {
            setError(
                normalizeError(error, 'Failed to load game state.')
            );
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
        error
    };
};
export default useGameState;