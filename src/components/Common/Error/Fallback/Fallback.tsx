import {FC} from "react";

interface ErrorFallbackProps {
    error: Error,
    resetErrorBoundary: () => void; // Function to reload state
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
};
export default ErrorFallback;