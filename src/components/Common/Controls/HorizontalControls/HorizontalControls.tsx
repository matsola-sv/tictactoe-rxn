import {FC, ReactNode} from "react";
import classNames from "classnames";
// Models
import {UIElementSize, UILayoutOption as Placement} from "../../../../models/ui";
// Components
import RowContainer from "../../UI/RowContainer/RowContainer";
// Styles
import "./HorizontalControls.css";

interface HorizontalControlsProps {
    children: ReactNode;         // Elements you want to display on the panel. It can also be an array of ReactElements
    placement?: Placement;       // Specifies the layout pattern (placement or column distribution)
    className?: string;
    size?: UIElementSize;        // Size of the control elements (buttons, icons etc.)
}

const HorizontalControls: FC<HorizontalControlsProps> = ({children, className, placement = Placement.Center, size = UIElementSize.M}) => {
    return (
        <RowContainer
            placement={placement}
            className={classNames(`horiz-controls horiz-controls--${size}`, className)}
        >
            {children}
        </RowContainer>
    );
};
export default HorizontalControls;