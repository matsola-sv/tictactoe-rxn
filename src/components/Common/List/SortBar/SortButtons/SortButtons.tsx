import { FC, MouseEvent } from 'react';
import classNames from 'classnames';
// Font Awesome icons
import { faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Models
import { SortTypes } from 'utils/sorting';
import { ButtonMouseHandler } from 'components/Common/Controls/Button/Button.type';
// Components
import Button from 'components/Common/Controls/Button/Button';

interface SortButtonsProps {
	sortOrder: SortTypes; // Sorting direction (ascending/descending)
	onSortOrderChange: (order: SortTypes) => void;
}

const SortButtons: FC<SortButtonsProps> = ({ sortOrder, onSortOrderChange }) => {
	/**
	 * @param order
	 */
	const getButtonClass = (order: SortTypes) => {
		return classNames('sort-arrow', { active: sortOrder === order });
	};

	const onSortHandler: ButtonMouseHandler<SortTypes> = (
		e: MouseEvent<HTMLButtonElement>,
		order?: SortTypes,
	) => {
		onSortOrderChange(order ?? sortOrder);
	};

	return (
		<>
			<Button<SortTypes>
				ariaLabel='Sort Ascending'
				className={getButtonClass(SortTypes.Asc)}
				onClick={(event) => onSortHandler(event, SortTypes.Asc)}
			>
				<FontAwesomeIcon icon={faSortAmountUp} />
			</Button>
			<Button<SortTypes>
				ariaLabel='Sort Descending'
				className={getButtonClass(SortTypes.Desc)}
				onClick={(event) => onSortHandler(event, SortTypes.Desc)}
			>
				<FontAwesomeIcon icon={faSortAmountDown} />
			</Button>
		</>
	);
};
export default SortButtons;
