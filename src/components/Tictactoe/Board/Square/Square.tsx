import React, {FC, FormEvent, ReactElement} from "react";
import './Square.css';

export type SquareHandlerType = {
    (event: React.FormEvent): void
}

export type SquareProps =  {
    id: number,
    content?: ReactElement | null,
    selected?: boolean,
    selectedLine?: boolean,
    onClick: SquareHandlerType
};

const Square: FC<SquareProps> = (props) => {
    const {
        content = null,
        selected = false,
        selectedLine = false,
        onClick
    }: SquareProps = props;

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
export default Square;