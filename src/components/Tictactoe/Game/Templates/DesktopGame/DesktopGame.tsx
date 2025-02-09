import {FC} from "react";
import {GameTemplateProps} from "../../GameView/GameView.types";
import HorizontalControls from "../../../../Common/Controls/HorizontalControls/HorizontalControls";
import "./DesktopGame.css";

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
                        {/* The history move control buttons */}
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