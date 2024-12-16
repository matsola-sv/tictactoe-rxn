import {FC} from "react";
import {MovesHistoryHandlerI} from "../MoveHistory.types";

export interface DefaultMovePropsI {
    selected: boolean,
    onClick: MovesHistoryHandlerI
}

const DefaultMove: FC<DefaultMovePropsI> = (props) => {
    const { selected = false }: DefaultMovePropsI = props;
    const classes: string  = selected ? 'selected' : "";

    const clickHandler = () => {
        props.onClick(0);
    };

    return (
        <li className={classes}>
            <span>Go to game </span>
            <a href="#" onClick={clickHandler}>start</a>
        </li>
    );
}
export default DefaultMove;