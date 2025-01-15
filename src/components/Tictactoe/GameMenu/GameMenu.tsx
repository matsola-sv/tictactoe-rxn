import {FC} from "react";
import {useDispatch} from "react-redux";
import classNames from "classnames";

// Fontawesome icons
import {faPause, faPlay, faSyncAlt} from '@fortawesome/free-solid-svg-icons';

// Models
import {LayoutAlignment} from "../../../models/layout";
import {GameStatus} from "../../../models/tictactoe/gameStatus";
import {ButtonMouseHandler} from "../../Common/Controls/Button/Button.type";

// Redux
import {AppDispatch} from "../../../redux/store";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {newGame, togglePause} from "../../../redux/tictactoe/game/gameSlice";

import HorizontalBar from "../../Common/Controls/HorizontalBar/HorizontalBar";
import GameButton from "../GameButton/GameButton";

import "./GameMenu.css";

interface GameMenuPropsI {
    isDisabled?: boolean; // The menu is inactive, but it is displayed
}

const GameMenu: FC<GameMenuPropsI> = ({isDisabled = false}) => {
    const dispatch = useDispatch<AppDispatch>();
    const gameStatus: GameStatus = useTypedSelector(state => state.t3game.state.status);
    const isGamePaused: boolean = gameStatus === GameStatus.Paused;
    const isGameRunning: boolean = gameStatus === GameStatus.Running;
    const canActivePause: boolean = isGamePaused || isGameRunning;

    const handlePause: ButtonMouseHandler = () => {
        dispatch(togglePause());
    };

    const handleNewGame: ButtonMouseHandler = () => {
        dispatch(newGame());
    };

    return (
        <div className={classNames('game-menu buttons', {'disabled': isDisabled})}>
            <HorizontalBar alignment={LayoutAlignment.CENTER}>
                <GameButton
                    onClick={handlePause}
                    isDisabled={!canActivePause}
                    icon={isGamePaused ? faPlay : faPause}
                    title={isGamePaused ? "Resume" : "Pause"}
                    className={classNames('pause-btn', {'paused': isGamePaused})}
                />
                <GameButton
                    title="New Game"
                    icon={faSyncAlt}
                    isDisabled={isDisabled}
                    onClick={handleNewGame}
                    className="new-game-btn"
                />
            </HorizontalBar>
        </div>
    );
};
export default GameMenu;