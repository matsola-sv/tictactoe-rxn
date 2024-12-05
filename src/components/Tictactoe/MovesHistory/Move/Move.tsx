import {FC} from "react";
import {MovesHistoryHandlerI} from "../MovesHistory";
import './Move.css';


export interface MovePropsI {
    id: number,
    date: Date,
    squareID: number,
    selected: boolean,
    onClick: MovesHistoryHandlerI
}

const Move: FC<MovePropsI> = (props) => {
    // Set default props
    const { squareID, selected = false } = props;

    const classes: string = selected ? 'selected' : "";
    const date: string = props.date.toLocaleTimeString();

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
            <span>Go to move</span>
            <a href="#" onClick={handleClick}>
                <span className="move-id">#{props.id}</span>
                <span className="move-coords">{getCoordinates()}</span>
            </a>
            <span> - {date}</span>
        </li>
    );
}
export default Move;