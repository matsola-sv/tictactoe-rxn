import {FC} from "react";
// Models
import {GameTemplateProps} from "../../GameView/GameView.types";
// Components
import HorizontalControls from "../../../../Common/Controls/HorizontalControls/HorizontalControls";
// Styles
import "../Common.css"; // Global styles (used in all display templates)
import "./DesktopGame.css"; // Specific styles for desktop version

const DesktopGame: FC<GameTemplateProps> = ({board, gameControls, gameStopwatch, gameStatus, movesList, movesControls}) => {
    return (
        <>
            {/* Left column */}
            <div className="t3-layout__left">
                <div className="t3-layout__left-game-controls">
                    {/* The game controls buttons */}
                    {gameControls}
                </div>

                <div className="t3-layout__game-board">
                    {/* The game board */}
                    {board}
                </div>

                <HorizontalControls className="t3-layout__left-stopwatch">
                    {gameStopwatch}
                </HorizontalControls>
            </div>

            {/* Right column */}
            <div className="t3-layout__right">
                <div className="t3-layout__game-info">
                    {/* The game status element */}
                    {gameStatus}

                    <div className="t3-layout__right-moves">
                        {/* The history move control buttons (sorting and navigation bar) */}
                        {movesControls}

                        {/* The history move list */}
                        {movesList}
                    </div>
                </div>
            </div>
        </>
    );
};
export default DesktopGame;