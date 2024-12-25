import {FC, ReactElement} from "react";
import "./SortLabel.css";

interface SortLabelProps {
    label?: string | ReactElement;
}

const SortLabel: FC<SortLabelProps> = ({ label = "Sorted by"}) => {
    return (
        <div className="sort-label">
            {label}
        </div>
    );
};
export default SortLabel;