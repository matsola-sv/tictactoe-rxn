import {FC} from "react";
import {PlayerI} from "../../../../models/player";

type VictoryStatusProps = {
    player: PlayerI
}

const VictoryStatus: FC<VictoryStatusProps> = (props) => {
    return (
        <div className="victory">
            Winner: {props.player.name}
        </div>
    );
}
export default VictoryStatus;