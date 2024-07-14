import React, {FC, ReactElement} from "react";
import {T3BoardRow} from "./board/row";
import {T3Square} from "./board/square";

export type T3SquareType = string | null;

interface T3BoardPropsI {
    columns: number,
    selected: number | null,
    selectedLine?: number[],
    onClick: (squareID: number) => void,
    squares: T3SquareType[]
}

export const T3Board: FC<T3BoardPropsI> = (props) => {
    // Default value of props
    const { selectedLine = [] } : T3BoardPropsI = props;

    /**
     * This syntax provides binding `this` inside
     * @param id
     */
    const handlerClickSquare = (id: number) => {
        props.onClick(id);
    }

    /**
     * Render square of the playing board
     * @param id
     */
    const renderSquare = (id: number): ReactElement => {
        const renderLine = selectedLine.indexOf(id) !== -1;
        const unselected = id !== props.selected || renderLine;
        const content: ReactElement = <span>{props.squares[id]}</span>

        return <T3Square id={id}
                         key={id}
                         selected={!unselected}
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
            <T3BoardRow key={rowId}
                        squares={squares}
            />
        )
    }

    /**
     * Render all rows of the playing board
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
        <div>
            {renderRows()}
        </div>
    );
}