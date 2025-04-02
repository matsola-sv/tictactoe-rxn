import {createSlice} from "@reduxjs/toolkit";
import {PlayerSettingsStateI} from "./types";
import {SortTypes} from "utils/sorting";

/**
 * This represents the user interface state that can be modified by the user, such as:
 * - Sorting methods
 * - Element visibility
 * - Color theme
 * - Symbol colors for "X" and "O" (if customizable)
 * - Sound volume
 */
const initialPlayerState: PlayerSettingsStateI = {
    game: {
        // History moves UI settings
        history: {
            sorting: {
                order: SortTypes.Asc,       // Order of sorting (e.g., ascending, descending)
                field: "Move number"        // The currently selected sorting field (e.g., move number)
            },
            visibility: false,              // Whether history of moves is visible or not
        }
    }
};

const Player = createSlice({
    name: "t3-player",
    initialState: initialPlayerState,
    reducers: {
        /** Toggle the sorting order of the history moves */
        toggleHistorySort(state: PlayerSettingsStateI) {
            // Map sort orders
            const sortOrder = state.game.history.sorting.order;
            const sortMap = {
                [SortTypes.Asc]: SortTypes.Desc,
                [SortTypes.Desc]: SortTypes.Asc,
            };
            state.game.history.sorting.order = sortMap[sortOrder];
        },
        /** Toggles the visibility of the history moves */
        toggleHistoryVisibility(state: PlayerSettingsStateI) {
            const visibility = state.game.history.visibility;
            state.game.history.visibility = !visibility;
        }
    }
});

export const { toggleHistorySort, toggleHistoryVisibility } = Player.actions;

export default Player.reducer;