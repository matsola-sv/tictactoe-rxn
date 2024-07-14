import {FC} from "react";
import {T3HistoryHandlerI} from "../history";

export interface T3DefaultMovePropsI {
    selected: boolean,
    onClick: T3HistoryHandlerI
}

export const T3HistoryDefaultMove: FC<T3DefaultMovePropsI> = (props) => {
    const { selected = false }: T3DefaultMovePropsI = props;
    const classes: string  = selected ? 'selected' : "";

    const clickHandler = () => {
        props.onClick(0);
    };

    return (
        <li className={classes}>
            <span>Go to game </span>
            <a href="#" onClick={ clickHandler }> start </a>
        </li>
    );
}