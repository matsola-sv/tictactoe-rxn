import {GameStateI} from "../../models/tictactoe/game";

/**
 * Service for working with game states: retrieving and saving game states.
 */

/**
 * URL to data source
 */
const SOURCE_URL = "/database/t3Storage.json";

/**
 * Get data from the storage by type
 * @param url URL source
 * @param type type of data in storage
 */
const getData = async <T>(url: string, type?: string): Promise<T> => {
    const response = await fetch(url);
    const data = await response.json();

    if (type) {
        if (!(type in data)) {
            throw new Error(`Undefined "${type}" in data!`);
        }
        return data[type];
    }
    return data;
};

/**
 * TODO Here should be the preparation of the received data
 * Get all states of a specific Game
 * @param gameID Ідентифікатор гри
 */
export const getGameStates = async <T>(gameID: T): Promise<GameStateI[]> => {
    return getData<GameStateI[]>(SOURCE_URL, "states");
};

/**
 * Get the last state of the Game
 * @param gameID Ідентифікатор гри
 */
export const getLastGameState = async <T>(gameID: T): Promise<GameStateI | null> => {
    const states = await getGameStates(gameID);
    return states[states.length - 1] || null;
};