import {SortTypes} from "../utils/sorting";

export type SortHandler = {
    (order: SortTypes): void
}