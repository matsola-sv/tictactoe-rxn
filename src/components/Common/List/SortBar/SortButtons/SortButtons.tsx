import {FC} from "react";
import classNames from "classnames";

import {SortTypes} from "../../../../../utils/sorting";

import "./SortButtons.css"

interface SortButtonsProps {
    sortOrder: SortTypes; // Sorting direction (ascending/descending)
    onSortOrderChange: (order: SortTypes) => void;
}

const SortButtons: FC<SortButtonsProps> = ({sortOrder, onSortOrderChange}) => {
    /**
     * @param order
     */
    const getButtonClass = (order: SortTypes) => {
        return classNames("sort-arrow", {active: sortOrder === order});
    }

    return (
        <div className="sort-buttons">
            <button
                className={getButtonClass(SortTypes.Asc)}
                onClick={() => onSortOrderChange(SortTypes.Asc)}
                aria-label="Sort Ascending"
            >
                ↑
            </button>
            <button
                className={getButtonClass(SortTypes.Desc)}
                onClick={() => onSortOrderChange(SortTypes.Desc)}
                aria-label="Sort Descending"
            >
                ↓
            </button>
        </div>
    )
};
export default SortButtons;