import {FC} from "react";
import classNames from "classnames";
import {MovesHistoryHandlerI} from "../HistoryList.types";

interface DefaultMovePropsI {
    selected: boolean;
    onClick: MovesHistoryHandlerI;
    details?: string;                // Move details text
}

const DefaultMove: FC<DefaultMovePropsI> = ({ selected = false, details = "start", onClick }) => {
    const clickHandler = () => onClick(0);

    return (
        <li className={classNames({"selected" : selected})} onClick={clickHandler}>
            <span className="move-action">Go to game </span>
            <span className="move-details">{details}</span>
        </li>
    );
}
export default DefaultMove;