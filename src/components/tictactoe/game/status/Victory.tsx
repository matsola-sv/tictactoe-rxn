import {FC} from "react";
import {PlayerI} from "../../../../models/player";

type T3VictoryStatusProps = {
    player: PlayerI
}

const T3VictoryStatus: FC<T3VictoryStatusProps> = (props) => {
    return (
        <div className="victory">
            Winner: {props.player.name}
        </div>
    );
}
export default T3VictoryStatus;