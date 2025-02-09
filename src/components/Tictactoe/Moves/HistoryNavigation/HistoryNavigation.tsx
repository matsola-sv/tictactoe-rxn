import {FC} from "react";
import {useDispatch} from "react-redux";
// Fontawesome icons
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
// Models
import {NavDirection} from "../../../../models/lists";
// Redux
import {AppDispatch} from "../../../../redux/store";
import {goToMove} from "../../../../redux/tictactoe/game/gameSlice";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
// Services
import {getMovesPagination} from "../../../../services/tictactoe/gameLogic";
// Components
import GameButton from "../../Controls/GameButton/GameButton";

interface HistoryNavigationProps {
    buttonClass?: string;
}

const HistoryNavigation: FC<HistoryNavigationProps> = ({ buttonClass }) => {
    const dispatch = useDispatch<AppDispatch>();
    const gameState = useTypedSelector(state => state.t3game.state);
    const { nextItem: nextMove, prevItem: prevMove } = getMovesPagination(gameState);

    const clickHandler = (direction: NavDirection) => {
        // Map directions to their respective move offsets
        const moveOffset = {
            [NavDirection.Next]: 1,
            [NavDirection.Back]: -1,
        }[direction];

        if (moveOffset) {
            dispatch(goToMove(gameState.currentMove + moveOffset));
        }
    };

    return (
        <>
            <GameButton
                icon={faAngleLeft}
                className={buttonClass}
                isDisabled={prevMove === null}
                onClick={() => clickHandler(NavDirection.Back)}
            />
            <GameButton
                icon={faAngleRight}
                className={buttonClass}
                isDisabled={nextMove === null}
                onClick={() => clickHandler(NavDirection.Next)}
            />
        </>
    );
}
export default HistoryNavigation;