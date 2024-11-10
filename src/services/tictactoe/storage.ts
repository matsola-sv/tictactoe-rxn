import {T3GameStateI} from "../../components/Tictactoe/Game/Game";

export class T3Storage {
    protected readonly sourceUrl = "/database/t3Storage.json";

    /**
     * Get all states of a specific Game
     * @param gameID
     */
    public getStates(gameID: number): Promise<T3GameStateI[]> {
        return this.getData<T3GameStateI[]>(
            this.sourceUrl, "states"
        );
    }

    /**
     * Get the last state of the Game
     * @param gameID
     */
    public getLastState(gameID: number): Promise<T3GameStateI> {
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
