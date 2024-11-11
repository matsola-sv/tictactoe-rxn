import React, {FC} from "react";
import {PlayerI} from "../../../../models/player";

type NextStatusPropsI = {
    player: PlayerI
}

const T3NextMoveStatus: FC<NextStatusPropsI> = (props) => {
    return (
        <div className="next">
            Next player: {props.player.name}
        </div>
    );
}
export default T3NextMoveStatus;