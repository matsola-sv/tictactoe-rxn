import {FC} from "react";

// Fontawesome
import {faPauseCircle, faSave} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {GameStatus} from "../../../../models/tictactoe/gameStatus";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

import "./ActionIndicators.css";

interface Indicator {
    id: number;
    isActive: boolean;
    icon: IconDefinition;
    className?: string;
}

/**
 * Only one button is displayed: either the pause indicator or the save indicator, depending on the game state.
 * @constructor
 */
const ActionIndicators: FC = () => {
    const isPaused: boolean = useTypedSelector(
        state => state.t3game.state.status === GameStatus.Paused
    );
    const isSaving: boolean = useTypedSelector(state =>
        state.t3game.state.status === GameStatus.Saving
    );

    // List of indicators that shows which action is currently being performed (e.g., pause or saving).
    const indicators: Indicator[] = [
        { id: 1, isActive: isPaused, icon: faPauseCircle, className: "pause" },
        { id: 2, isActive: isSaving, icon: faSave, className: "save" }
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
                            className="icon"
                        />
                    </div>
                ) : null
            )}
        </div>
    );
}
export default ActionIndicators;