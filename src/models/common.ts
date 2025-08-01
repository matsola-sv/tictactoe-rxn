export interface AsyncStateI {
	loading: boolean;
	error: Error | null;
}

export interface ValidationResult {
	isValid: boolean;
	error: string | null;
}
