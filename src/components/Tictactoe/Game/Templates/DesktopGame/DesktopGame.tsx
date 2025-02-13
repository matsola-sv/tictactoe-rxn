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
            <div className="game-left">
                <div className="controls-wrapper">
                    {/* The game controls buttons */}
                    {gameControls}
                </div>

                <div className="board-container">
                    {/* The game board */}
                    {board}
                </div>

                <HorizontalControls>
                    {gameStopwatch}
                </HorizontalControls>
            </div>

            {/* Right column */}
            <div className="game-right">
                <div className="game-info">
                    {/* The game status element */}
                    {gameStatus}

                    <div id="history-moves">
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