import React, {FC, ReactElement, ReactNode} from "react";
import './Row.css';

export type T3BoardRowProps = {
    squares?: ReactElement[],
    children?: ReactNode
};

const T3BoardRow: FC<T3BoardRowProps> = ({squares = null, children}) => {
    return (
        <div className="board-row">
            {squares ?? children}
        </div>
    );
}
export default T3BoardRow;