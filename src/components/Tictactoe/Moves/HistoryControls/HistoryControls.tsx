import {FC} from "react";
// Models
import {UIElementSize, UILayoutOption} from "../../../../models/ui";
// Hooks
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
// Components
import RowContainer from "../../../Common/UI/RowContainer/RowContainer";
import HorizontalControls from "../../../Common/Controls/HorizontalControls/HorizontalControls";
import SortLabel from "../../../Common/List/SortBar/SortLabel/SortLabel";
import SortFields from "../../../Common/List/SortBar/SortFields/SortFields";
import HistorySort from "../HistorySort/HistorySort";
import HistoryNext from "../HistoryNavigation/HistoryNext";
import HistoryPrevious from "../HistoryNavigation/HistoryPrevious";
// Styles
import "./HistoryControls.css";

const HistoryControls: FC = () => {
    //TODO TEMP need to be broken down into game settings and the game process itself.
    const sorting = useTypedSelector(state => state.t3game.state.settings.history.sorting);

    return (
        <div>
            {/* Horizontal bar for move history sorting controls */}
            <HorizontalControls
                size={UIElementSize.S}
                className="moves-sort-bar"
                placement={UILayoutOption.Right}
            >
                <SortLabel key={"mh-sort-label"}/>
                <SortFields
                    key={"mh-sort-fields"}
                    fields={[sorting.field]}
                    activeField={sorting.field}
                />
                <HistorySort key={"mh-sort-buttons"}/>
            </HorizontalControls>

            {/* Horizontal bar for move history navigation controls */}
            <HorizontalControls
                placement={UILayoutOption.TwoColumns}
                className="moves-nav-bar"
                size={null} // Pass `null` to prevent applying the size class for HorizontalControls.
            >
                <RowContainer placement={UILayoutOption.Left}>
                    <HistoryPrevious/>
                </RowContainer>
                <RowContainer placement={UILayoutOption.Right}>
                    <HistoryNext/>
                </RowContainer>
            </HorizontalControls>
        </div>
    );
};
export default HistoryControls;