import {FC} from "react";
import "./Draw.css";

type DrawStatusProps = {
    value?: string
}

const DrawStatus: FC<DrawStatusProps> = ({ value = "Draw in tic-tac-toe game" }) => {
    return (
        <div className="status-draw">
            {value}
        </div>
    );
}
export default DrawStatus;