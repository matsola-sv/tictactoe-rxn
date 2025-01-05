import {FC, useState} from "react";
import "./InfoTooltip.css";

interface InfoTooltipProps {
    text: string;
}

const InfoTooltip: FC<InfoTooltipProps> = ({text}) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    return (
        <span
            className="info-tooltip"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            onTouchStart={() => setTooltipVisible(!isTooltipVisible)} // For mobile devices
        >
          ⓘ
            {isTooltipVisible && (
                <div className="tooltip-text">{text}</div>
            )}
        </span>
    );
};
export default InfoTooltip;
