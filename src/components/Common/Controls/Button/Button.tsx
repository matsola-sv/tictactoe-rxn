import {ReactElement} from "react";
import classNames from "classnames";
import {ButtonPropsI} from "components/Common/Controls/Button/Button.type";

/**
 * Button component that handles optional click events with custom data.
 * The default value of T as 'void' allows using the ButtonMouseHandler type without specifying T when no data is provided.
 *
 * Example usage:
 *
 * const clickHandler: ButtonEventHandler<number> = (event: MouseEvent<HTMLButtonElement>, id?: number) => {
 *      console.log('On click:', event, id);
 * };
 *
 * const clickHandler2: ButtonEventHandler<number> = () => console.log('On click');
 *
 * <Button<number> onClick={event => clickHandler(event, 10)}>
 *      <span>Button</span>
 * </Button>
 *
 * <Button<number> onClick={clickHandler2}>
 *      <span>Button2</span>
 * </Button>
 *
 * @param props The properties for the Button component.
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

    const classes = classNames(`btn ${className}`,
        {'disabled': isDisabled}
    );

    return (
        <button disabled={isDisabled}
                className={classes}
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