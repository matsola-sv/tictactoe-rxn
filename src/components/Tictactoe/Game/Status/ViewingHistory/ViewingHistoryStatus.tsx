import {FC, ReactElement} from "react";
import InfoTooltip from "../../../../Common/UI/InfoTooltip/InfoTooltip";
import "./ViewingHistory.css";

interface ViewingHistoryPropsI {
    statusComponent: ReactElement;  // Component that is passed to display game status
    tooltip?: string;               // Clarification information for the status
}

const ViewingHistoryStatus: FC<ViewingHistoryPropsI> = ({ statusComponent, tooltip }) => {
    const defaultTooltip: string = "In this mode, you cannot make moves, start or stop the game. You can only view past game states.";

    return (
        <div className="t3-status t3-status--vh">
            <div className="t3-status-vh__header">
                Viewing History
                <InfoTooltip text={tooltip || defaultTooltip}/>
            </div>
            <div className="t3-status-vh__inline">
                {statusComponent}
            </div>
        </div>
    );
};
export default ViewingHistoryStatus;