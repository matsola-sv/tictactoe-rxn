import {GameStateI} from "../../models/tictactoe/game";

export class GameStateService {
    protected readonly sourceUrl = "/database/t3Storage.json";

    /**
     * TODO Here should be the preparation of the received data
     * Get all states of a specific Game
     * @param gameID
     */
    public getStates<T>(gameID: T): Promise<GameStateI[]> {
        return this.getData<GameStateI[]>(
            this.sourceUrl, "states"
        );
    }

    /**
     * Get the last state of the Game
     * @param gameID
     */
    public getLastState<T>(gameID: T): Promise<GameStateI | null> {
        return new Promise((resolve, reject) => {
            this.getStates(gameID)
                .then(states => resolve(states[states.length - 1]))
                .catch(error => reject(error));
        });
    }

    /**
     * Get data from the storage by type
     * @param url
     * @param type
     * @protected
     */
    protected getData<T>(url: string, type?: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (!type) {
                        resolve(data);
                        return;
                    }

                    if (!(type in data)) {
                        reject(`Undefined "${type}" in data!`);
                        return;
                    }
                    resolve(data[type]);
                }).catch(e => reject(e));
        });
    }
}