import {FC} from "react";
import {useMediaQuery} from "react-responsive";
// Fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPauseCircle, faSave, faStopwatch} from "@fortawesome/free-solid-svg-icons";
// Models
import {UIFontAwesomeUIElement} from "../../../models/ui";
import {GameStatus} from "../../../models/tictactoe/gameStatus";
// Hooks
import {useTypedSelector} from "../../../hooks/useTypedSelector";
// Styles
import "./ActionIndicators.css";

/**
 * Only one button is displayed: either the pause indicator or the save indicator, depending on the game state.
 * @constructor
 */
const ActionIndicators: FC = () => {
    // Check option is enabled in the browser to reduce or disable animations
    const isAnimation: boolean = !useMediaQuery({
        query: '(prefers-reduced-motion: reduce)'
    });

    const statusGame: GameStatus = useTypedSelector(
        state => state.t3game.state.status
    );
    const isPaused: boolean = statusGame === GameStatus.Paused;
    const isSaving: boolean = statusGame === GameStatus.Saving;
    const isRunning: boolean = statusGame === GameStatus.Running;

    // List of indicators that shows which action is currently being performed (e.g., pause or saving).
    const indicators: UIFontAwesomeUIElement[] = [
        { id: 1, isActive: isPaused, icon: faPauseCircle, className: "pause" },      // When game is pausing
        { id: 2, isActive: isRunning, icon: faStopwatch, animation: { beat: true }}, // When the stopwatch is running
        { id: 3, isActive: isSaving, icon: faSave, className: "save" }               // When game is saving
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
                            { ...(isAnimation ? indicator.animation: {}) } // If animation is enabled, apply all available animations to the icon
                        />
                    </div>
                ) : null
            )}
        </div>
    );
}
export default ActionIndicators;