import {FC} from "react";
import {faCompress, faExpand} from "@fortawesome/free-solid-svg-icons";
// Models
import {FullscreenToggleProps} from "./types";
// Hooks
import useFullscreenStatus from "../../../../hooks/useFullscreenStatus";
// Components
import IconButton from "../IconButton/IconButton";

const FullscreenToggle: FC<FullscreenToggleProps> = ({isDisabled, buttonClass, labels = {enter: "Full screen", exit: "Exit full screen"}}) => {
    const { isFullscreen, toggleFullscreen } = useFullscreenStatus();

    return (
        <IconButton
            className={buttonClass}
            isDisabled={isDisabled}
            title= { isFullscreen ? labels.exit : labels.enter }
            icon={ isFullscreen ? faCompress : faExpand }
            onClick={toggleFullscreen}
        />
    );
};
export default FullscreenToggle;