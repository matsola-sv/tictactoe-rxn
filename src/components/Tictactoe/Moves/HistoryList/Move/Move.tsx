import { forwardRef } from 'react';
import classNames from 'classnames';
import { MovesHistoryHandlerI } from 'components/Tictactoe/Moves/HistoryList/HistoryList.types';
import 'components/Tictactoe/Moves/HistoryList/Move/Move.css';

export interface MovePropsI {
	id: number;
	date: Date; // The timestamp of when the move was made.
	squareID: number; // The ID of the square involved in the move.
	isSelected: boolean;
	onClick: MovesHistoryHandlerI;
	canShowDate?: boolean; // Determines whether the date of the move should be shown in the history of moves
}

const Move = forwardRef<HTMLLIElement, MovePropsI>((props, moveRef) => {
	// Set default props
	const { squareID, isSelected = false, canShowDate = true } = props;
	const date: string = props.date.toLocaleTimeString();

	const handleClick = () => {
		props.onClick(props.id);
	};

	const getCoordinates = (): string => {
		let col: number = squareID % 3;
		let row: number = Math.floor(squareID / 3);

		return `(col: ${col}; row: ${row})`;
	};

	return (
		<li
			ref={moveRef}
			onClick={handleClick}
			className={classNames({ selected: isSelected })}
		>
			<span className='move-action'>Go to move</span>
			<span className='move-details'>
				<span className='move-id'>#{props.id}</span>
				<span className='move-coords'>{getCoordinates()}</span>
			</span>

			{canShowDate && <span className='move-date'> - {date}</span>}
		</li>
	);
});
export default Move;
