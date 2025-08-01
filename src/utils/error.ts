export const normalizeError = (
	error: unknown,
	defaultMessage: string = 'An unknown error',
): Error => {
	if (error instanceof Error) {
		return error;
	}

	if (typeof error === 'string') {
		return new Error(error);
	}
	return new Error(defaultMessage);
};

export const logError = (error: unknown, defaultMessage?: string): void => {
	console.error(normalizeError(error, defaultMessage));
};
