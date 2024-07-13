import React, { FC, ReactElement, ReactNode } from "react";

type RowProps = {
    squares?: ReactElement[],
    children?: ReactNode
};

export const T3BoardRow: FC<RowProps> = ({squares = null, children}) => {
    return (
        <div className="board-row">
            {squares ?? children}
        </div>
    );
}