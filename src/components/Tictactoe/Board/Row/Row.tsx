import React, {FC, ReactElement, ReactNode} from "react";
import 'components/Tictactoe/Board/Row/Row.css';

export type BoardRowProps = {
    squares?: ReactElement[],
    children?: ReactNode
};

const BoardRow: FC<BoardRowProps> = ({squares = null, children}) => {
    return (
        <div className="board-row">
            {squares ?? children}
        </div>
    );
}
export default BoardRow;