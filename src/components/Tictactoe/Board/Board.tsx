import React, {FC, ReactElement} from "react";
import BoardRow from "./Row/Row";
import Square from "./Square/Square";
import "./Board.css";

export type SquareType = string | null;
export type BoardElHandlerType = {
    (squareID: number): void
}

export interface BoardPropsI {
    columns: number;
    disabled?: boolean;
    selected: number | null;
    selectedLine?: number[];
    onClick: BoardElHandlerType;
    squares: SquareType[];
}

const Board: FC<BoardPropsI> = (props) => {
    // Default value of props
    const { selectedLine = [], disabled = false } : BoardPropsI = props;

    /**
     * This syntax provides binding `this` inside
     * @param id
     */
    const handlerClickSquare: BoardElHandlerType = (id: number) => {
        props.onClick(id);
    }

    /**
     * Render square of the playing Board
     * @param id
     */
    const renderSquare = (id: number): ReactElement => {
        const value: SquareType = props.squares[id];
        const renderLine = selectedLine.indexOf(id) !== -1;
        const selected = !(id !== props.selected || renderLine);
        const opened: boolean = !(value === null || selected || renderLine);
        const content: ReactElement = <span>{value}</span>

        return <Square id={id}
                         key={id}
                         opened={opened}
                         disabled={disabled}
                         selected={selected}
                         selectedLine={renderLine}
                         content={content}
                         onClick={handlerClickSquare.bind(this, id)}
        />;
    }

    /**
     * @param squares
     * @param rowId
     */
    const renderRow = (squares: ReactElement[], rowId: number): ReactElement => {
        return (
            <BoardRow key={rowId}
                        squares={squares}
            />
        )
    }

    /**
     * Render all rows of the playing Board
     */
    const renderRows = (): ReactElement[] => {
        let rows: ReactElement[] = [];
        let rowItems: ReactElement[] = [];
        let step: number = props.columns;

        props.squares.forEach((square, i) => {
            if (step === 0) {
                rowItems = [];
                step = props.columns;
            }
            rowItems.push(renderSquare(i));

            if (step === 1) {
                rows.push(
                    renderRow(rowItems, rows.length)
                );
            }
            step--;
        });
        return rows;
    }

    return (
        <div className="game-board">
            {renderRows()}
        </div>
    );
}

export default Board;