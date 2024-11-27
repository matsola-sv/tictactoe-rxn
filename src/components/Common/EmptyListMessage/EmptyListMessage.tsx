import {FC} from "react";
import "./EmptyListMessage.css";

interface EmptyListMessageProps {
    message?: string;
}

const EmptyListMessage: FC<EmptyListMessageProps> = ({message = "The list is empty"}) => {
    return (
        <div className="empty-list-message">
            <strong>{message}</strong>
        </div>
    );
};
export default EmptyListMessage;