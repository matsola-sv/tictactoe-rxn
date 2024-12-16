import {FC} from "react";
import {MovesHistoryHandlerI} from "../MoveHistory.types";
import './Move.css';

export interface MovePropsI {
    id: number,
    date: Date,                     // The timestamp of when the move was made.
    squareID: number,               // The ID of the square involved in the move.
    isSelected: boolean,
    onClick: MovesHistoryHandlerI
}

const Move: FC<MovePropsI> = (props) => {
    // Set default props
    const { squareID, isSelected = false } = props;

    const classes: string = isSelected ? 'selected' : "";
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