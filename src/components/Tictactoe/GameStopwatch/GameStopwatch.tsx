import {FC, useEffect} from "react";
// Models
import {GameStatus} from "models/tictactoe/gameStatus";
// Hooks
import {useTypedSelector} from "hooks/useTypedSelector";
import useStopwatch from "hooks/useStopwatch";
// Redux
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {updateGameDuration} from "../../../redux/tictactoe/game/gameSlice";
// Components
import TimeViewer from "components/Common/Clock/TimeViewer/TimeViewer";
// Styles
import "components/Tictactoe/GameStopwatch/GameStopwatch.css";

interface GameStopwatchProps {
    initialMillis?: number;
}

const GameStopwatch: FC<GameStopwatchProps> = ({ initialMillis = 0 }) => {
    const dispatch = useDispatch<AppDispatch>();
    const gameStatus: GameStatus = useTypedSelector(state => state.t3game.state.status);
    const { hours, minutes, seconds, secondsStamp, start, pause, reset } = useStopwatch(
        { autoStart: false, initialMillis }
    );

    // Reset stopwatch on initialMillis change (e.g., new game)
    useEffect(() => {
        const currentMillis: number = secondsStamp * 1000;
        if (currentMillis !== initialMillis) {
            reset(false, initialMillis);
        }
    }, [initialMillis]); // eslint-disable-line react-hooks/exhaustive-deps

    // Control the stopwatch when changing statuses
    // Exclude 'secondsStamp' from dependencies as it's updated only when the game status changes
    useEffect(() => {
        if (gameStatus === GameStatus.Running) {
            start();
            return;
        }
        if (gameStatus === GameStatus.Waiting) {
            reset(false, initialMillis);
            return;
        }

        // Pause the stopwatch, not the game (it doesn't go into "Pausing" status)
        pause();

        // Update the game duration in seconds, storing the current time in state
        dispatch(updateGameDuration(secondsStamp));
    }, [gameStatus, pause, start, reset]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <TimeViewer
            hours={hours}
            minutes={minutes}
            seconds={seconds}
        />
    );
};
export default GameStopwatch;