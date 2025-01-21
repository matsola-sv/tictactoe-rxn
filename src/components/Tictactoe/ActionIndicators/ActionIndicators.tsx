import {FC} from "react";

// Fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faClock, faPauseCircle, faSave} from "@fortawesome/free-solid-svg-icons";

import {GameStatus} from "../../../../models/tictactoe/gameStatus";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

import "./ActionIndicators.css";

interface Indicator {
    id: number;
    isActive: boolean;
    icon: IconDefinition;
    className?: string;
    spin?: boolean;        // To spin animation
    pulse?: boolean;       // To pulse animation
    spinPulse?: boolean    // To spin plus pulse animation
}

/**
 * Only one button is displayed: either the pause indicator or the save indicator, depending on the game state.
 * @constructor
 */
const ActionIndicators: FC = () => {
    const statusGame: GameStatus = useTypedSelector(
        state => state.t3game.state.status
    );
    const isPaused: boolean = statusGame === GameStatus.Paused;
    const isSaving: boolean = statusGame === GameStatus.Saving;
    const isRunning: boolean = statusGame === GameStatus.Running;

    // List of indicators that shows which action is currently being performed (e.g., pause or saving).
    const indicators: Indicator[] = [
        { id: 1, isActive: isPaused, icon: faPauseCircle, className: "pause" }, // When game is pausing
        { id: 2, isActive: isRunning, icon: faClock, spin: true},               // When the stopwatch is running
        { id: 3, isActive: isSaving, icon: faSave, className: "save" }          // When game is saving
    ]

    const hasActions: boolean = indicators.some(
        indicator => indicator.isActive
    );

    // Don't render the element if there is no indicator, so it doesn't take up space in the DOM
    if (!hasActions) {
        return null;
    }

    return (
        <div className="action-indicators">
            {/* Show list action indicators */}
            {indicators.map((indicator) =>
                indicator.isActive ? (
                    <div key={indicator.id} className={`action-indicator ${indicator.className}`}>
                        <FontAwesomeIcon
                            icon={indicator.icon}
                            spin={indicator.spin}
                            pulse={indicator.pulse}
                            spinPulse={indicator.spinPulse}
                            className="icon"
                        />
                    </div>
                ) : null
            )}
        </div>
    );
}
export default ActionIndicators;