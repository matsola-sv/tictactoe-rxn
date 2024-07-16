import {FC} from "react";
import {T3PlayerI} from "../Game";
import {T3HistoryHandlerI} from "../History";

export interface T3MovePropsI {
    id: number,
    date: number,
    squareID: number,
    player: T3PlayerI,
    selected: boolean,
    onClick: T3HistoryHandlerI
}

const T3HistoryMove: FC<T3MovePropsI> = (props) => {
    // Set default props
    const { squareID, selected = false } = props;

    const classes: string = selected ? 'selected' : "";
    const date: string = new Date(props.date)
        .toLocaleTimeString();

    const handleClick = () => {
        props.onClick(props.id);
    };

    const getCoordinates = (): string => {
        let col: number = squareID % 3;
        let row: number = Math.floor(squareID / 3);

        return `(col: ${col}; row: ${row})`;
    }

    return (
        <li className={classes}>
            <span>Go to move  </span>
            <a href="#" onClick={handleClick}>
                    <span className="move-id">
                        #{props.id}
                    </span>
                <span className="move-coords">
                        {getCoordinates()}
                    </span>
            </a>
            <span> - {date}</span>
        </li>
    );
}
export default T3HistoryMove;