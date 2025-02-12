import {SortTypes} from "../../../utils/sorting";

export interface PlayerSettingsStateI {
    game: {
        // History moves settings (sorting and visibility)
        history: {
            sorting: {
                order: SortTypes;    // Order of sorting (e.g., ascending, descending)
                field: string;       // The currently selected sorting field (e.g., move number)
            };
            visibility: boolean;     // Whether history of moves is visible or not
        };
    };
}