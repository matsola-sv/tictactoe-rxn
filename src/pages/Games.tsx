import React, {FC, useEffect, useState} from "react";
import T3Game, {T3GameStateI} from "../components/tictactoe/Game";
import {T3Storage} from "../services/tictactoe/storage";
import Preloader from "../components/common/Preloader";

const GamesPage: FC = () => {
    const gameID: number = 1; // Temp
    const storageService = new T3Storage();

    const [gameState, setGameState] = useState<T3GameStateI>();

    // Loading game state only once
    useEffect(() => {
        storageService.getLastState(gameID)
            .then(lastGame => {
                setGameState(lastGame);
            });
    }, []);

    if (!gameState) {
        return <Preloader/>
    }

    return (
        <React.Fragment>
            <T3Game gameState={gameState}/>
        </React.Fragment>
    );
}
export default GamesPage;