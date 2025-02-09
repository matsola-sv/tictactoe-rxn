import {FC, ReactNode} from "react";
import classNames from "classnames";
// Fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
// Models
import {ButtonMouseHandler} from "../../../Common/Controls/Button/Button.type";
// Components
import Button from "../../../Common/Controls/Button/Button";

interface GameButtonProps {
    onClick: ButtonMouseHandler;
    children?: ReactNode;
    icon?: IconDefinition;
    isDisabled?: boolean;
    className?: string;
    title?: string;
}

const GameButton: FC<GameButtonProps> = ({isDisabled = false, children = null, onClick, className, title, icon}) => {
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
            className={classNames('game-btn', className)}
        >
            {getContent()}
        </Button>
    );
};
export default GameButton;