import {FC} from "react";
import {T3PlayerI} from "../../game";

type T3VictoryStatusProps = {
    player: T3PlayerI
}

export const T3VictoryStatus: FC<T3VictoryStatusProps> = (props) => {
    return (
        <div className="victory">
            Winner: {props.player.name}
        </div>
    );
}