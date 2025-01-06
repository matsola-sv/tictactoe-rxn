import {FC, useEffect} from "react";

// Models
import {GameStatus} from "../../../models/tictactoe/gameStatus";

// Hooks
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import useStopwatch from "../../../hooks/useStopwatch";

// Redux
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {updateGameDuration} from "../../../redux/tictactoe/game/gameSlice";

import TimeViewer from "../../Common/Clock/TimeViewer/TimeViewer";

interface GameStopwatchProps {
    initialMillis?: number;
}

const GameStopwatch: FC<GameStopwatchProps> = ({ initialMillis = 0 }) => {
    const dispatch = useDispatch<AppDispatch>();
    const gameStatus = useTypedSelector(state => state.t3game.state.status);
    const { hours, minutes, seconds, secondsStamp, start, pause } = useStopwatch(
        { autoStart: false, initialMillis }
    );

    // Exclude 'secondsStamp' from dependencies as it's updated only when the game status changes
    useEffect(() => {
        if (gameStatus === GameStatus.Running) {
            start();
            return;
        }
        // Pause the stopwatch
        pause();

        // Update the game duration in seconds, storing the current time in state
        dispatch(updateGameDuration(secondsStamp));
    }, [gameStatus, pause, start]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <TimeViewer
            hours={hours}
            minutes={minutes}
            seconds={seconds}
        />
    );
};
export default GameStopwatch;