import {FC} from "react";
import {useDispatch} from "react-redux";
// Fontawesome icons
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
//Models
import {NavDirection} from "../../../models/lists";
//Redux
import {AppDispatch} from "../../../redux/store";
import {goToMove} from "../../../redux/tictactoe/game/gameSlice";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

import {getMovesPagination} from "../../../services/tictactoe/gameLogic";
import GameButton from "../GameButton/GameButton";

import "./MovesNavigation.css";

const MovesNavigation: FC = () => {
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
        <div className="moves-nav">
            <GameButton
                isDisabled={prevMove === null}
                icon={faAngleLeft}
                onClick={() => clickHandler(NavDirection.Back)}
            />
            <GameButton
                isDisabled={nextMove === null}
                icon={faAngleRight}
                onClick={() => clickHandler(NavDirection.Next)}
            />
        </div>
    );
}
export default MovesNavigation;
