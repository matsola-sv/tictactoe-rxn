import {GameStateI as GameState} from "../../../models/tictactoe/game";

export interface GameStateMetaI {
    isRestored: boolean;
}

export interface GameStateContainerI {
    meta: GameStateMetaI;
    state: GameState;
}