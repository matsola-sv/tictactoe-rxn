import {FC} from "react";
import classNames from "classnames";

// Fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPauseCircle, faSave} from "@fortawesome/free-solid-svg-icons";

import {GameStatus} from "../../../../models/tictactoe/gameStatus";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

import "./ActionIndicator.css";

/**
 * Only one button is displayed: either the pause indicator or the save indicator, depending on the game state.
 * @constructor
 */
const ActionIndicator: FC = () => {
    const isPaused: boolean = useTypedSelector(
        state => state.t3game.state.status === GameStatus.Paused
    );
    const isSaving: boolean = useTypedSelector(state =>
        state.t3game.state.status === GameStatus.Saving
    );

    return (
        <div className={classNames('action-indicator', {'save': isSaving, 'pause': isPaused})}>
            {/* Show pause or saving indicator */}
            {isPaused && <FontAwesomeIcon icon={faPauseCircle} className="icon" />}
            {isSaving && <FontAwesomeIcon icon={faSave} className="icon save-icon" />}
        </div>
    );
}
export default ActionIndicator;