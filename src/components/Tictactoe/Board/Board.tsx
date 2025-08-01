import React, { FC, ReactElement } from 'react';
import classNames from 'classnames';
// Models
import {
	BoardElHandlerType,
	BoardPropsI,
	SquareType,
} from 'components/Tictactoe/Board/Board.types';
// Components
import BoardRow from 'components/Tictactoe/Board/Row/Row';
import Square from 'components/Tictactoe/Board/Square/Square';
import SquareContent from 'components/Tictactoe/Board/Square/Content/SquareContent';
import EmptyListMessage from 'components/Common/EmptyListMessage/EmptyListMessage';

import 'components/Tictactoe/Board/Board.css';

const Board: FC<BoardPropsI> = (props) => {
	const {
		columns,
		squares,
		onClick,
		selected,
		isClickable = true,
		isDisabled = false,
		selectedLine = [],
		fallbackComponent = <EmptyListMessage />,
	} = props;

	/**
	 * This syntax provides binding `this` inside
	 * @param id
	 */
	const handlerClickSquare: BoardElHandlerType = (id: number) => {
		onClick(id);
	};

	/**
	 * Render square of the playing Board
	 * @param id
	 */
	const renderSquare = (id: number): ReactElement => {
		const value: SquareType = squares[id];
		const opened: boolean = value !== null;
		const renderLine = selectedLine.indexOf(id) !== -1;
		const newSelected = !(id !== selected || renderLine);
		const content: ReactElement = <SquareContent value={value} />;

		// Indicates the square is disabled (not clickable and visually locked):
		// The square is disabled if the board is not clickable and the square is empty.
		const squareDisabled: boolean = !isClickable && value === null;

		return (
			<Square
				id={id}
				key={id}
				isOpened={opened}
				canClickIfOpened={false}
				isDisabled={squareDisabled}
				isSelected={newSelected}
				isSelectedLine={renderLine}
				content={content}
				onClick={handlerClickSquare.bind(this, id)}
			/>
		);
	};

	/**
	 * @param squares
	 * @param rowId
	 */
	const renderRow = (squares: ReactElement[], rowId: number): ReactElement => {
		return (
			<BoardRow
				key={rowId}
				squares={squares}
			/>
		);
	};

	/**
	 * Render all rows of the playing Board
	 */
	const renderRows = (): ReactElement[] => {
		let rows: ReactElement[] = [];
		let rowItems: ReactElement[] = [];
		let step: number = columns;

		squares.forEach((square, i) => {
			if (step === 0) {
				rowItems = [];
				step = columns;
			}
			rowItems.push(renderSquare(i));

			if (step === 1) {
				rows.push(renderRow(rowItems, rows.length));
			}
			step--;
		});
		return rows;
	};

	if (squares.length === 0) {
		return fallbackComponent;
	}

	return (
		<div
			className={classNames('game-board', {
				'locked-element': isDisabled,
				'un-clickable': !isClickable,
			})}
		>
			{renderRows()}
		</div>
	);
};

export default Board;
