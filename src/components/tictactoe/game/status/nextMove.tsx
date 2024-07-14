import React, {FC} from "react";
import {T3PlayerI} from "../../game";

type NextStatusPropsI = {
    player: T3PlayerI
}

export const T3NextMoveStatus: FC<NextStatusPropsI> = (props) => {
    return (
        <div className="next">
            Next player: {props.player.name}
        </div>
    );
}