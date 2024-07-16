import {FC} from "react";
import {T3PlayerI} from "../../Game";

type T3VictoryStatusProps = {
    player: T3PlayerI
}

const T3VictoryStatus: FC<T3VictoryStatusProps> = (props) => {
    return (
        <div className="victory">
            Winner: {props.player.name}
        </div>
    );
}
export default T3VictoryStatus;