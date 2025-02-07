import {FC} from "react";
import {PlayerI} from "../../../../../models/player";
import "./Victory.css";

type VictoryStatusProps = {
    player: PlayerI
}

const VictoryStatus: FC<VictoryStatusProps> = ({player}) => {
    return (
        <div className="t3-status t3-status--victory">
            Winner: {player.name}
        </div>
    );
}
export default VictoryStatus;