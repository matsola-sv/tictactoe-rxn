import React, { FC, ReactElement, ReactNode } from "react";

export type T3BoardRowProps = {
    squares?: ReactElement[],
    children?: ReactNode
};

export const T3BoardRow: FC<T3BoardRowProps> = ({squares = null, children}) => {
    return (
        <div className="board-row">
            {squares ?? children}
        </div>
    );
}