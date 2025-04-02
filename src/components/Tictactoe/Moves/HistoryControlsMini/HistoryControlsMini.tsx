import {FC, ReactElement} from "react";
import {useDispatch} from "react-redux";
// Fontawesome icons
import {faShoePrints} from "@fortawesome/free-solid-svg-icons";
// Models
import {UIElementSize, UILayoutOption} from "models/ui";
// Redux
import {AppDispatch} from "../../../../redux/store";
import {toggleHistoryVisibility} from "../../../../redux/tictactoe/player/playerSlice";
// Hooks
import {useTypedSelector} from "hooks/useTypedSelector";
// Components
import RowContainer from "components/Common/UI/RowContainer/RowContainer";
import NoShoePrintsIcon from "components/Common/UI/Icons/NoShoePrintsIcon/NoShoePrintsIcon";
import HorizontalControls from "components/Common/Controls/HorizontalControls/HorizontalControls";
import IconButton from "components/Common/Controls/IconButton/IconButton";
import HistorySort from "components/Tictactoe/Moves/HistorySort/HistorySort";
import HistoryPrevious from "components/Tictactoe/Moves/HistoryNavigation/HistoryPrevious";
import HistoryNext from "components/Tictactoe/Moves/HistoryNavigation/HistoryNext";

/**
 * Note:
 * It's better to pass HistoryVisible as a prop instead of storing it in the component state.
 * This allows loading the game with the previous state or considering a setting to always show the history, providing greater flexibility.
 */
const HistoryControlsMini: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const visibility = useTypedSelector(state => state.t3player.game.history.visibility);

    // To toggle history visibility in Redux
    const toggleVisibility = () => {
        dispatch(toggleHistoryVisibility());
    };

    const getToggleHistoryButton = (): ReactElement => {
        if (visibility) {
            return (
                <IconButton onClick={toggleVisibility}>
                    <NoShoePrintsIcon/>
                </IconButton>
            );
        }
        return (
            <IconButton
                icon={faShoePrints}
                onClick={toggleVisibility}
            />
        );
    };

    const getPlacement = (): UILayoutOption => {
        return visibility
            ? UILayoutOption.ThreeColumns
            : UILayoutOption.TwoColumns
    };

    return (
        <HorizontalControls
            size={UIElementSize.S}
            placement={getPlacement()}
        >
            <RowContainer
                placement={UILayoutOption.Left}
            >
                {getToggleHistoryButton()}
            </RowContainer>

            {visibility && (
                <RowContainer>
                    <HistorySort/>
                </RowContainer>
            )}

            <RowContainer placement={UILayoutOption.Right}>
                <HistoryPrevious/>
                <HistoryNext/>
            </RowContainer>
        </HorizontalControls>
    );
};
export default HistoryControlsMini;