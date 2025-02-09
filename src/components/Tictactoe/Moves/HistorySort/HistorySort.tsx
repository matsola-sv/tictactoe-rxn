import {FC, useCallback} from "react";
import {useDispatch} from "react-redux";
// Models
import {SortTypes} from "../../../../utils/sorting";
import {SortHandler} from "../../../../models/lists";
// Redux
import {AppDispatch} from "../../../../redux/store";
import {toggleHistorySort} from "../../../../redux/tictactoe/game/gameSlice";
// Hooks
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
// Components
import SortButtons from "../../../Common/List/SortBar/SortButtons/SortButtons";

const HistorySort: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    //TODO TEMP need to be broken down into game settings and the game process itself.
    const sorting = useTypedSelector(state => state.t3game.state.settings.history.sorting);

    const sortHandler: SortHandler = useCallback((order: SortTypes): void => {
        if (sorting.order !== order) {
            dispatch(toggleHistorySort());
        }
    }, [sorting, dispatch]);

    return (
        <SortButtons
            sortOrder={sorting.order}
            onSortOrderChange={sortHandler}
        />
    );
};
export default HistorySort;