import {FC, ReactNode} from "react";
import classNames from "classnames";

import {LayoutAlignment} from "../../../../models/layout";

import "./HorizontalBar.css";

interface HorizontalBarProps {
    children: ReactNode; // Elements you want to display on the panel. It can also be an array of ReactElements
    alignment?: LayoutAlignment; // Alignment child components
}

const HorizontalBar: FC<HorizontalBarProps> = ({children, alignment = LayoutAlignment.LEFT}) => {
    const getContainerClass = (align: LayoutAlignment) => {
        return classNames("horizontal-bar", {
            "align-left": align === LayoutAlignment.LEFT,
            "align-center": align === LayoutAlignment.CENTER,
            "align-right": align === LayoutAlignment.RIGHT,
        });
    };

    return (
        <div className={getContainerClass(alignment)}>
            <div className="bar-group">
                {children}
            </div>
        </div>
    )
};
export default HorizontalBar;