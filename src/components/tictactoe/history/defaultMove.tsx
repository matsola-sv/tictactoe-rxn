import {FC} from "react";

export interface T3DefaultMovePropsI {
    selected: boolean,
}

export const T3HistoryDefaultMove: FC<T3DefaultMovePropsI> = (props) => {
    const { selected = false }: T3DefaultMovePropsI = props;
    const classes: string  = selected ? 'selected' : "";

    return (
        <li className={classes}>
            <span>Go to game </span>
            <a href="#"> start </a>
        </li>
    );
}