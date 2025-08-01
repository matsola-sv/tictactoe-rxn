import { GameMoveI, GameStateI as GameState } from 'models/tictactoe/game';
import { GameStatus } from 'models/tictactoe/gameStatus';

/**
 * Game meta-data.
 * Stores additional information that is not part of the main game state but is important
 * for the internal game logic, particularly for transitions between modes.
 *
 * - `isRestored`: indicates whether the game state has been restored from a previous save.
 * - `previousStatus`: stores the previous game status to correctly handle transitions
 *   between modes (e.g., between the active game and the game history view). This field
 *   allows returning to the previous game status after exiting the history view mode.
 */
export interface GameStateMetaI {
	isRestored: boolean;
	previousStatus: GameStatus;
}

export interface GameStateContainerI {
	meta: GameStateMetaI;
	state: GameState;
}

export interface MoveActionPayloadI {
	currentMove: number;
	history: GameMoveI[];
}
