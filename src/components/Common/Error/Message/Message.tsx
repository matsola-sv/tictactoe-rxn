import {FC} from "react";
import "./Message.css";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="error-message">
            <strong>Error:</strong> {message}
        </div>
    );
};
export default ErrorMessage;