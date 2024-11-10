import {FC} from "react";

type T3DrawStatusProps = {
    value?: string
}

const T3DrawStatus: FC<T3DrawStatusProps> = (props) => {
    const {
        value = "Draw in tic-tac-toe Game"
    }: T3DrawStatusProps = props;

    return (
        <div className="draw">
            {value}
        </div>
    );
}
export default T3DrawStatus;