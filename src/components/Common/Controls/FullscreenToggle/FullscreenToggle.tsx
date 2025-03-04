import {FC} from "react";
import classNames from "classnames";
// Fontawesome
import {faCompress, faExpand} from "@fortawesome/free-solid-svg-icons";
// Models
import {FullscreenToggleProps} from "./FullscreenToggle.types";
// Hooks
import useFullscreen from "../../../../hooks/fullscreen/useFullscreen";
// Components
import IconButton from "../IconButton/IconButton";

const FullscreenToggle: FC<FullscreenToggleProps> = ({isDisabled, buttonClass, labels = {enter: "Full screen", exit: "Exit full screen"}}) => {
    const { isFullscreen, toggleFullscreen, isFullscreenSupported } = useFullscreen();

    return (
        <IconButton
            className={classNames(buttonClass, {"disabled": !isFullscreenSupported})}
            isDisabled={isDisabled}
            title= { isFullscreen ? labels.exit : labels.enter }
            icon={ isFullscreen ? faCompress : faExpand }
            onClick={toggleFullscreen}
        />
    );
};
export default FullscreenToggle;