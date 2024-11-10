import {FC} from "react";
import {SortTypes} from "../../../../utils/sort";
import './SortBar.css';

export type SortBarHandlerI = {
    (order: SortTypes): void
}

interface SortBarProps {
    ascTitle?: string,
    descTitle?: string,
    active: SortTypes | null,
    onSort: SortBarHandlerI
}

const SortBar: FC<SortBarProps> = (props) => {
    const asc: SortTypes = SortTypes.Asc;
    const desc: SortTypes = SortTypes.Desc;

    // Set default props
    const {
        onSort,
        active = null,
        ascTitle = "Sort Asc",
        descTitle = "Sort Desc"
    }: SortBarProps = props;

    /**
     * @param order
     */
    const getActiveClass = (order: SortTypes | null): string => {
        return active === order ? 'active' : "";
    }

    return (
        <div className="sort-bar">
            <button className={getActiveClass(asc)}
                    onClick={onSort.bind(this, asc)}
            >
                {ascTitle}
            </button>
            <button className={getActiveClass(desc)}
                    onClick={onSort.bind(this, desc)}
            >
                {descTitle}
            </button>
        </div>
    )
}
export default SortBar;