import {FC} from "react";
import {useDispatch} from "react-redux";
import classNames from "classnames";

// Models
import {LayoutAlignment} from "../../../models/layout";
import {GameStatus} from "../../../models/tictactoe/gameStatus";
import {ButtonMouseHandler} from "../../Common/Controls/Button/Button.type";

// Redux
import {AppDispatch} from "../../../redux/store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {togglePause} from "../../../redux/tictactoe/game/gameSlice";

import HorizontalBar from "../../Common/Controls/HorizontalBar/HorizontalBar";
import Button from "../../Common/Controls/Button/Button";

import "./GameMenu.css";

interface GameMenuPropsI {
    isDisabled?: boolean; // The menu is inactive, but it is displayed
}

const GameMenu: FC<GameMenuPropsI> = ({isDisabled}) => {
    const dispatch = useDispatch<AppDispatch>();
    const isGamePaused: boolean = useTypedSelector(
        state => state.t3game.state.status === GameStatus.Paused
    );

    const handlePauseClick: ButtonMouseHandler = () => {
        dispatch(togglePause());
    };

    return (
        <div className={classNames('game-menu', {'disabled': isDisabled})}>
            <HorizontalBar alignment={LayoutAlignment.CENTER}>
                <Button
                    onClick={handlePauseClick}
                    className={classNames('pause-btn', {'paused': isGamePaused})}
                >
                    {isGamePaused ? "Resume" : "Pause"}
                </Button>
            </HorizontalBar>
        </div>
    );
};
export default GameMenu;