import { MouseEvent, ReactNode } from 'react';

/**
 * Possible in two versions (without parameters and with one mandatory one)
 * Defaulting T to 'void' allows using the ButtonMouseHandler type without needing to specify T when no data is passed.
 */
export type ButtonMouseHandler<T = void> =
	| (() => void)
	| ((event: MouseEvent<HTMLButtonElement>, data?: T) => void);

export interface ButtonPropsI<T = void> {
	children: ReactNode; // The content displayed inside the button
	isActive?: boolean; // Determines if the button is visible (active) or not
	isDisabled?: boolean; // Indicates if the button is rendered but not interactive (disabled)
	className?: string; // Text for screen readers to clarify the button's purpose, especially when it lacks visible text or only contains an icon.
	ariaLabel?: string;
	onClick?: ButtonMouseHandler<T>;
	onMouseEnter?: ButtonMouseHandler<T>; // Tracks when the mouse cursor is over a button
	onMouseLeave?: ButtonMouseHandler<T>; // Tracks the moment when the mouse cursor leaves the button.
}
