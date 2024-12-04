import {GameStateI as GameState} from "../../../models/tictactoe/game";

export interface GameStateContainerI {
    meta: GameStateMetaI;
    state: GameState;
}

export interface GameStateMetaI {
    isRestored: boolean;
}