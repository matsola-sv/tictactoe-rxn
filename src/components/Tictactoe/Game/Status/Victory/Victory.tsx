import {FC} from "react";
import {PlayerI} from "../../../../../models/player";
import "./Victory.css";

type VictoryStatusProps = {
    player: PlayerI
}

const VictoryStatus: FC<VictoryStatusProps> = (props) => {
    return (
        <div className="status-victory">
            Winner: {props.player.name}
        </div>
    );
}
export default VictoryStatus;