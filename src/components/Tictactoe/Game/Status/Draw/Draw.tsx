import {FC} from "react";
import "./Draw.css";

type DrawStatusProps = {
    value?: string
}

const DrawStatus: FC<DrawStatusProps> = (props) => {
    const {
        value = "Draw in tic-tac-toe game"
    }: DrawStatusProps = props;

    return (
        <div className="status-draw">
            {value}
        </div>
    );
}
export default DrawStatus;