import {SortTypes} from "../utils/sorting";

// Since `SortHandler` describes a type for a sorting handler that works with specific data
// (e.g., for sorting lists or objects), it makes sense to place it in the `models` folder,
// which contains types that define the structure and functionality of data within the app.
export type SortHandler = {
    (order: SortTypes): void
}