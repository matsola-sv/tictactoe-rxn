import {FC} from "react";
import "./Message.css";

interface ErrorMessageProps {
    error: Error;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
    return (
        <div className="error-message">
            <strong>Error:</strong> {error.message}
        </div>
    );
};
export default ErrorMessage;