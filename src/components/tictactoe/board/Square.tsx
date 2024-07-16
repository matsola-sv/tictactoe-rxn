import React, {FC, ReactElement, FormEvent} from "react";

export type T3SquareHandlerI = {
    (event: React.FormEvent): void
}

export type T3SquareProps =  {
    id: number,
    content?: ReactElement | null,
    selected?: boolean,
    selectedLine?: boolean,
    onClick: T3SquareHandlerI
};

const T3Square: FC<T3SquareProps> = (props) => {
    const {
        content = null,
        selected = false,
        selectedLine = false,
        onClick
    }: T3SquareProps = props;

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
            {content}
        </button>
    );
}
export default T3Square;