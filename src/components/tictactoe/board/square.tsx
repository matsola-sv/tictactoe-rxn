import React, {FC, FormEvent} from "react";

export enum T3SquareType {
    O = "O",
    X = "X",
    Empty = ""
}

type T3SquareProps =  {
    id: number,
    value?: T3SquareType,
    selected?: boolean,
    selectedLine?: boolean,
    onClick: (event: React.FormEvent) => void
};

export const T3Square: FC<T3SquareProps> = (props) => {
    const { value, selected = false, selectedLine = false, onClick }: T3SquareProps = props;

    /**
     * This syntax provides binding `this` inside
     * @param event
     */
    const handlerClick = (event: FormEvent<HTMLButtonElement>) => {
        onClick(event);
    };

    const getClassName = (): string => {
        let className: string = 'square';
        if (selected) {
            className += ' selected';
        }

        if (selectedLine) {
            className += ' selected-line';
        }
        return className;
    };

    return (
        <button className={getClassName()}
                onClick={handlerClick}
        >
            {value}
        </button>
    );
}