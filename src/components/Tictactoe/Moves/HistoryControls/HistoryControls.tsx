import {FC} from "react";
// Models
import {UIElementSize, UILayoutOption} from "../../../../models/ui";
// Hooks
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
// Components
import HorizontalControls from "../../../Common/Controls/HorizontalControls/HorizontalControls";
import SortLabel from "../../../Common/List/SortBar/SortLabel/SortLabel";
import SortFields from "../../../Common/List/SortBar/SortFields/SortFields";
import HistorySort from "../HistorySort/HistorySort";

import "./HistoryControls.css";

const HistoryControls: FC = () => {
    //TODO TEMP need to be broken down into game settings and the game process itself.
    const sorting = useTypedSelector(state => state.t3game.state.settings.history.sorting);

    return (
        <HorizontalControls
            size={UIElementSize.S}
            className="sort-bar-container"
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
    );
};
export default HistoryControls;