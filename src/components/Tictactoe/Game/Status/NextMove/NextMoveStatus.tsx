import React, {FC} from "react";
import {PlayerI} from "models/player";
import "components/Tictactoe/Game/Status/NextMove/NextMove.css";

type NextStatusPropsI = {
    player: PlayerI
}

const NextMoveStatus: FC<NextStatusPropsI> = ({player}) => {
    return (
        <div className="t3-status t3-status--next">
            Next player: {player.name}
        </div>
    );
}
export default NextMoveStatus;