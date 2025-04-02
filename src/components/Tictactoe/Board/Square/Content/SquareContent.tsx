import React, {FC} from "react";
import "components/Tictactoe/Board/Square/Content/SquareContent.css";

interface SquareContentProps {
    value: string | null;
}

const SquareContent: FC<SquareContentProps> = ({value})=> {
    return (
        <div className="square-content">
            {value}
        </div>
    )
};
export default SquareContent;