import { GameStateI } from 'models/tictactoe/game';
import { getPublicUrl } from 'utils/url';

/**
 * Service for working with game states: retrieving and saving game states.
 */

/**
 * URL to data source
 */
const T3_DB_URL = getPublicUrl('/database/t3Storage.json');

/**
 * Get data from the storage by type
 * @param url URL source
 * @param type type of data in storage
 */
const getData = async <T>(url: string, type?: string): Promise<T> => {
	const response = await fetch(url);

	if (!response.ok) {
		return Promise.reject(new Error(`HTTP error! Status: ${response.status}`));
	}
	const data = await response.json();

	if (type) {
		if (!(type in data)) {
			return Promise.reject(new Error(`Undefined "${type}" in data!`));
		}
		return data[type];
	}
	return data;
};

/**
 * TODO Here should be the preparation of the received data
 * Get all states of a specific Game
 * @param gameID
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const getGameStates = async <T>(gameID: T): Promise<GameStateI[]> => {
	return getData<GameStateI[]>(T3_DB_URL, 'states');
};

/**
 * Get the last state of the Game
 * @param gameID
 */
export const getLastGameState = async <T>(gameID: T): Promise<GameStateI | null> => {
	const states = await getGameStates(gameID);
	return states[states.length - 1] || null;
};
