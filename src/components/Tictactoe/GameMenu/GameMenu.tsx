import {FC} from "react";
import {useDispatch} from "react-redux";

import {AppDispatch} from "../../../redux/store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {togglePause} from "../../../redux/tictactoe/game/gameSlice";

import "./GameMenu.css";

const GameMenu: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isGamePaused = useTypedSelector(state => state.t3game.state.isPaused);

    const handlePauseClick = () => {
        dispatch(togglePause());
    };

    return (
        <div className="game-menu">
            <button className="pause-btn" onClick={handlePauseClick}>
                {isGamePaused ? "Resume" : "Pause"}
            </button>
        </div>
    );
};
export default GameMenu;