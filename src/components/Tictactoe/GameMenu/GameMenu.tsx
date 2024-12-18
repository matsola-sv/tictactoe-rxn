import {FC} from "react";
import {useDispatch} from "react-redux";
import classNames from "classnames";

import {AppDispatch} from "../../../redux/store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {togglePause} from "../../../redux/tictactoe/game/gameSlice";

import "./GameMenu.css";

interface GameMenuPropsI {
    isDisabled?: boolean; // The menu is inactive, but it is displayed
}

const GameMenu: FC<GameMenuPropsI> = ({isDisabled}) => {
    const dispatch = useDispatch<AppDispatch>();
    const isGamePaused = useTypedSelector(state => state.t3game.state.isPaused);

    const handlePauseClick = () => {
        dispatch(togglePause());
    };

    return (
        <div className={classNames('game-menu', {'disabled': isDisabled})}>
            <button className={classNames('pause-btn', {'paused': isGamePaused})} onClick={handlePauseClick}>
                {isGamePaused ? "Resume" : "Pause"}
            </button>
        </div>
    );
};
export default GameMenu;