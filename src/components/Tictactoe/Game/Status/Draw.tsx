import {FC} from "react";

type DrawStatusProps = {
    value?: string
}

const DrawStatus: FC<DrawStatusProps> = (props) => {
    const {
        value = "Draw in tic-tac-toe game"
    }: DrawStatusProps = props;

    return (
        <div className="draw">
            {value}
        </div>
    );
}
export default DrawStatus;