import {FC} from "react";
// Models
import {NavDirection} from "../../../../models/lists";
import {HistoryNavigationProps} from "./types";
// Hooks
import useMovesNavigation from "../../../../hooks/tictactoe/useMovesNavigation";
// Components
import NavButton from "../../Controls/NavButton/NavButton";

const NexButton: FC<HistoryNavigationProps> = ({ className = "" }) => {
    const { goTo, nextMove } = useMovesNavigation();

    return (
        <NavButton
            direction={NavDirection.Next}
            onClick={() => goTo(NavDirection.Next)}
            isDisabled={nextMove === null}
            className={className}
        />
    );
};
export default NexButton;