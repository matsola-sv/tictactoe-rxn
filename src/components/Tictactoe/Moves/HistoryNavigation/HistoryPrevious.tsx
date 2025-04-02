import {FC} from "react";
// Models
import {NavDirection} from "models/lists";
import {HistoryNavigationProps} from "components/Tictactoe/Moves/HistoryNavigation/types";
// Hooks
import useMovesNavigation from "hooks/tictactoe/useMovesNavigation";
// Components
import NavButton from "components/Common/Controls/NavButton/NavButton";

const PreviousButton: FC<HistoryNavigationProps> = ({ className = "" }) => {
    const { goTo, prevMove } = useMovesNavigation();

    return (
        <NavButton
            direction={NavDirection.Back}
            onClick={() => goTo(NavDirection.Back)}
            isDisabled={prevMove === null}
            className={className}
        />
    );
};
export default PreviousButton;