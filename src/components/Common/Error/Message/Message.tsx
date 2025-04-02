import {FC} from "react";
import "components/Common/Error/Message/Message.css";

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