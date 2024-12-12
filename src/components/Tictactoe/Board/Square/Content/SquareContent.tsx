import React, {FC} from "react";
import "./SquareContent.css";

interface SquareContentProps {
    value: string | null;
}

const SquareContent: FC<SquareContentProps> = ({value})=> {
    return (
        <div className="square-content test">
            {value}
        </div>
    )
};
export default SquareContent;