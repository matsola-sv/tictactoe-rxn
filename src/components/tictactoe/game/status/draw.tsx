import {FC} from "react";

type T3DrawStatusProps = {
    value?: string
}

export const T3DrawStatus: FC<T3DrawStatusProps> = (props) => {
    const {
        value = "Draw in tic-tac-toe game"
    }: T3DrawStatusProps = props;

    return (
        <div className="draw">
            {value}
        </div>
    );
}