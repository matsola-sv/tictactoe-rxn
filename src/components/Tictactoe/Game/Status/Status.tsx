import {FC, ReactElement} from "react";

// Models
import {GameStateI} from "../../../../models/tictactoe/game";
import {GameStatus} from "../../../../models/tictactoe/gameStatus";

// Hooks and services
import useGameResult, {GameResultI} from "../../../../hooks/tictactoe/useGameResult";
import {getCurrentPlayer} from "../../../../services/tictactoe/gameLogic";

import DrawStatus from "./Draw/DrawStatus";
import NextMoveStatus from "./NextMove/NextMoveStatus";
import VictoryStatus from "./Victory/VictoryStatus";
import ViewingHistory from "./ViewingHistory/ViewingHistoryStatus";

import "./Status.css";

interface StatusPropsI {
    gameState: GameStateI;
}

/**
 * The Status of the game on the current move changes when moving through the history of moves
 * @param gameState
 * @constructor
 */
const Status: FC<StatusPropsI> = ({gameState}) => {
    const gameResult: GameResultI = useGameResult({gameState: gameState});
    const status: GameStatus = gameState.status;

    /**
     * Note: no need for useCallback here, since renderStatus is only called during rendering
     * and does not get passed as a prop or used elsewhere where memoization would provide a benefit.
     */
    const renderStatus = (): ReactElement => {
        if (status === GameStatus.ViewingHistory) {
            return (
                <ViewingHistory
                    statusComponent={<NextMoveStatus
                        player={getCurrentPlayer(gameState)}
                    />}
                />
            );
        }

        if (gameResult.isDraw) {
            return <DrawStatus/>
        }

        return gameResult.winner ?
            <VictoryStatus player={gameResult.winner.player}/> :
            <NextMoveStatus player={getCurrentPlayer(gameState)}/>

    };

    return (
        <div className="status">
            <div className="text">
                {renderStatus()}
            </div>
        </div>
    );
};
export default Status;