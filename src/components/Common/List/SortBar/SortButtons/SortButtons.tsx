import {FC, MouseEvent} from "react";
import classNames from "classnames";

import {SortTypes} from "../../../../../utils/sorting";
import {ButtonMouseHandler} from "../../../Controls/Button/Button.type";

import Button from "../../../Controls/Button/Button";

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

    const onSortHandler: ButtonMouseHandler<SortTypes> = (e: MouseEvent<HTMLButtonElement>, order?: SortTypes) => {
        onSortOrderChange(order ?? sortOrder);
    };

    return (
        <div className="sort-buttons">
            <Button<SortTypes>
                ariaLabel="Sort Ascending"
                className={getButtonClass(SortTypes.Asc)}
                onClick={event => onSortHandler(event, SortTypes.Asc)}
            >
                ↑
            </Button>
            <Button<SortTypes>
                ariaLabel="Sort Descending"
                className={getButtonClass(SortTypes.Desc)}
                onClick={event => onSortHandler(event, SortTypes.Desc)}
            >
                ↑
            </Button>
        </div>
    )
};
export default SortButtons;