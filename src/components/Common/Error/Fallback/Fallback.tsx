import { FC } from 'react';
import Button from 'components/Common/Controls/Button/Button';

interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void; // Function to reload state
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<Button onClick={resetErrorBoundary}>Try again</Button>
		</div>
	);
};
export default ErrorFallback;
