import {FC} from "react";
import {useDispatch} from "react-redux";
import classNames from "classnames";
// Fontawesome icons
import {faPause, faPlay, faSyncAlt} from "@fortawesome/free-solid-svg-icons";
// Models
import {UIElementSize, UILayoutOption} from "models/ui";
import {GameStatus} from "models/tictactoe/gameStatus";
// Redux
import {ButtonMouseHandler} from "components/Common/Controls/Button/Button.type";
import {AppDispatch} from "store";
import {useTypedSelector} from "hooks/useTypedSelector";
import {newGame, togglePause} from "store/tictactoe/game/gameSlice";
// Components
import HorizontalControls from "components/Common/Controls/HorizontalControls/HorizontalControls";
import IconButton from "components/Common/Controls/IconButton/IconButton";
import FullscreenToggle from "components/Common/Controls/FullscreenToggle/FullscreenToggle";
// Styles
import "components/Tictactoe/Controls/GameControls/GameControls.css";

interface GameControlsPropsI {
    isDisabled?: boolean;       // The menu is inactive, but it is displayed
    controlSize?: UIElementSize // The size of the control elements
}

const GameControls: FC<GameControlsPropsI> = ({isDisabled = false, controlSize = UIElementSize.L}) => {
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
        <>
            <HorizontalControls
                size={controlSize}
                className="game-controls"
                placement={UILayoutOption.Center}
            >
                <IconButton
                    onClick={handlePause}
                    isDisabled={!canActivePause}
                    icon={isGamePaused ? faPlay : faPause}
                    title={isGamePaused ? "Resume" : "Pause"}
                    className={classNames('pause-btn', {'paused': isGamePaused})}
                />
                <IconButton
                    title="New Game"
                    icon={faSyncAlt}
                    isDisabled={isDisabled}
                    onClick={handleNewGame}
                    className="new-game-btn"
                />
                <FullscreenToggle isHideIfUnsupported={true} />
            </HorizontalControls>
        </>
    );
};
export default GameControls;