import {ReactElement} from "react";
import {ButtonPropsI} from "./Button.type";

/**
 * Button component that handles optional click events with custom data.
 * Example usage:
 *
 * const clickHandler: ButtonEventHandler<number> = (event: MouseEvent<HTMLButtonElement>, id?: number) => {
 *      console.log('on click:', event, id);
 * };
 *
 * const clickHandler2: ButtonEventHandler<number> = () => console.log('on click', event, id);
 *
 * <Button<number> onClick={event => clickHandler(event, 10)}>
 *      <span>Button</span>
 * </Button>
 *
 *  <Button<number> onClick={clickHandler2}>
 *      <span>Button2</span>
 * </Button>
 * @param props
 * @constructor
 */
const Button = <T = void>(props: ButtonPropsI<T>): ReactElement | null => {
    const {
        onClick,
        onMouseEnter,
        onMouseLeave,
        children,
        className,
        ariaLabel,
        isActive = true,
        isDisabled = false
    } = props;

    if (!isActive) {
        return null;
    }

    return (
        <button disabled={isDisabled}
                className={`btn ${className}`}
                aria-label={ariaLabel}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
        >
            {children}
        </button>
    );
};
export default Button;