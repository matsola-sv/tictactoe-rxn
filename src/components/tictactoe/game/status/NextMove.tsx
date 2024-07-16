import React, {FC} from "react";
import {T3PlayerI} from "../../Game";

type NextStatusPropsI = {
    player: T3PlayerI
}

const T3NextMoveStatus: FC<NextStatusPropsI> = (props) => {
    return (
        <div className="next">
            Next player: {props.player.name}
        </div>
    );
}
export default T3NextMoveStatus;