import {FC} from "react";
// Models
import {GameTemplateProps} from "../../GameView/GameView.types";
// Hooks
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";
// Components
import HorizontalControls from "../../../../Common/Controls/HorizontalControls/HorizontalControls";
// CSS
import "./MobileGame.css";

const MobileGame: FC<GameTemplateProps> = ({board, gameStatus, movesList, movesControls, gameControls, gameStopwatch}) => {
    const movesVisibility = useTypedSelector(
        state => state.t3game.state.settings.history.visibility
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

            <HorizontalControls>
                {gameStopwatch}
            </HorizontalControls>
        </>
    );
}
export default MobileGame;