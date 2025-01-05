import React, {FC} from "react";
import {PlayerI} from "../../../../../models/player";
import "./NextMove.css";

type NextStatusPropsI = {
    player: PlayerI
}

const NextMoveStatus: FC<NextStatusPropsI> = ({player}) => {
    return (
        <div className="status-next">
            Next player: {player.name}
        </div>
    );
}
export default NextMoveStatus;