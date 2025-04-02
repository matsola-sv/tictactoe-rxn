import {useDispatch} from "react-redux";
// Models
import {NavDirection} from "models/lists";
// Redux
import {AppDispatch} from "../../redux/store";
import {goToMove} from "../../redux/tictactoe/game/gameSlice";
// Hooks and Services
import {getMovesPagination} from "services/tictactoe/gameLogic";
import {useTypedSelector} from "hooks/useTypedSelector";

export interface useMovesNavigationResultI {
    goTo: (direction: NavDirection) => void;
    prevMove: number | null; // The previous move number
    nextMove: number | null; // The next move number
}

/**
 * A custom hook for handling move navigation in the game.
 *
 * - `goTo(direction)`: Moves forward or backward in the game history.
 * - `prevMove`: The previous available move (or `null` if not available).
 * - `nextMove`: The next available move (or `null` if not available).
 */
const useMovesNavigation = (): useMovesNavigationResultI => {
    const dispatch = useDispatch<AppDispatch>();
    const gameState = useTypedSelector(state => state.t3game.state);
    const { nextItem: nextMove, prevItem: prevMove } = getMovesPagination(gameState);

    // Go to nav direction
    const goTo = (direction: NavDirection) => {
        const moveOffset = direction === NavDirection.Next ? 1 : -1;
        dispatch(goToMove(gameState.currentMove + moveOffset));
    };

    return { goTo, prevMove, nextMove };
};
export default useMovesNavigation;