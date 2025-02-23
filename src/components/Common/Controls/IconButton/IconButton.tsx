import {FC, ReactNode} from "react";
import classNames from "classnames";
// Fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
// Models
import {ButtonMouseHandler} from "../Button/Button.type";
// Components
import Button from "../Button/Button";

interface IconButtonProps {
    onClick: ButtonMouseHandler;
    children?: ReactNode;
    icon?: IconDefinition;
    isDisabled?: boolean;
    className?: string;
    title?: string;
}

const IconButton: FC<IconButtonProps> = ({isDisabled = false, children = null, onClick, className, title, icon}) => {
    if (!children && !icon) {
        return null;
    }

    const getContent = (): ReactNode => {
        if (icon) {
            return (
                <FontAwesomeIcon
                    icon={icon}
                    title={title}
                />
            );
        }
        return children;
    };

    return (
        <Button
            onClick={onClick}
            ariaLabel={title}
            isDisabled={isDisabled}
            className={classNames(className)}
        >
            {getContent()}
        </Button>
    );
};
export default IconButton;