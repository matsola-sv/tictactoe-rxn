import React, {FC} from "react";

import useGameState from "../hooks/tictactoe/useGameState";

import Preloader from "../components/Common/UI/Preloader/Preloader";
import ErrorMessage from "../components/Common/Error/Message/Message";
import Game from "../components/Tictactoe/Game/Game";

const GamesPage: FC = () => {
    const gameID: number = 1; //TODO Temp
    const {loading, error, stateContainer} = useGameState<number>(gameID);

    if (loading) return <Preloader/>
    if (error) return <ErrorMessage error={error}/>

    return (
        <Game gameState={stateContainer.state}/>
    );
}
export default GamesPage;