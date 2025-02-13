import {FC} from "react";
// Models
import {GameTemplateProps} from "../../GameView/GameView.types";
// Hooks
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";
// Components
import HorizontalControls from "../../../../Common/Controls/HorizontalControls/HorizontalControls";
// Styles
import "../Common.css"; // Global styles (used in all display templates)
import "./MobileGame.css"; // Specific styles for mobile version

const MobileGame: FC<GameTemplateProps> = ({board, gameStatus, movesList, movesControls, gameControls, gameStopwatch}) => {
    const movesVisibility = useTypedSelector(
        state => state.t3player.game.history.visibility
    );
    return (
        <>
            {/* The game controls buttons */}
            {gameControls}

            {/* The game status element */}
            {gameStatus}

            <div className="board-container">
                {/* The game board */}
                {board}
            </div>

            {/* The history move control buttons */}
            <div id="t3-moves-controls-mobile">
                {movesControls}
            </div>

            {movesVisibility && (
                <div className="game-info">
                    {/* The history move list */}
                    {movesList}
                </div>
            )}

            <HorizontalControls className={"t3-stopwatch"}>
                {gameStopwatch}
            </HorizontalControls>
        </>
    );
}
export default MobileGame;