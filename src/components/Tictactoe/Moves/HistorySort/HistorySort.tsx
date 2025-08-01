import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
// Models
import { SortTypes } from 'utils/sorting';
import { SortHandler } from 'models/lists';
// Redux
import { AppDispatch } from 'store';
import { toggleHistorySort } from 'store/tictactoe/player/playerSlice';
// Hooks
import { useTypedSelector } from 'hooks/useTypedSelector'; // Components
import SortButtons from 'components/Common/List/SortBar/SortButtons/SortButtons';

const HistorySort: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const sorting = useTypedSelector((state) => state.t3player.game.history.sorting);

	const sortHandler: SortHandler = useCallback(
		(order: SortTypes): void => {
			if (sorting.order !== order) {
				dispatch(toggleHistorySort());
			}
		},
		[sorting, dispatch],
	);

	return (
		<SortButtons
			sortOrder={sorting.order}
			onSortOrderChange={sortHandler}
		/>
	);
};
export default HistorySort;
