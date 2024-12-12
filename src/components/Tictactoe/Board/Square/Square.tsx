import React, {FC, FormEvent, ReactElement, useCallback} from "react";
import './Square.css';

export type SquareHandlerType = {
    (event: React.FormEvent): void
}

export type SquareProps =  {
    id: number;
    content?: ReactElement | null;     // To display inside the square (e.g., "X" or "O"). Can be null if no content is provided
    canClickIfOpened?: boolean;        // Indicates that the square can be clickable if it is open.
    isOpened?: boolean;                // Indicates if the square is opened (viewable). It isn't clickable
    isSelected?: boolean;              // Indicates if the square is selected.
    isSelectedLine?: boolean;          // Indicates if the square is part of the selected line.
    isDisabled?: boolean;              // Inactive or not available for pressing and has a lock indicator.
    onClick: SquareHandlerType;
};

const Square: FC<SquareProps> = (props) => {
    const {
        content = null,
        isOpened = false,
        canClickIfOpened = true,
        isSelected = false,
        isSelectedLine = false,
        isDisabled = false,
        onClick
    }: SquareProps = props;

    /**
     * This syntax provides binding `this` inside
     * @param event
     */
    const handlerClick = (event: FormEvent<HTMLButtonElement>) => {
        onClick(event);
    };

    /**
     * NOTE: Current implementation uses simple if statements for readability and efficiency.
     * If the number of conditional classes grows significantly, consider refactoring
     * to a dynamic dependency-based approach (e.g., using an array of props and mappings).
     */
    const getClassName = useCallback(() => {
        let className: string = 'square';

        if (isDisabled) className += ' locked-element';
        if (isSelected) className += ' selected';
        if (isOpened) className += ` opened ${!canClickIfOpened ? ' un-clickable' : ''}`;
        if (isSelectedLine) className += ' selected-line';

        return className;

    }, [isDisabled, isSelected, isOpened, isSelectedLine, canClickIfOpened]);

    return (
        <button className={getClassName()}
                onClick={handlerClick}
        >
            {content}
        </button>
    );
}
export default Square;