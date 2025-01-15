import {FC} from "react";
import classNames from "classnames";

// Fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

import {ButtonMouseHandler} from "../../Common/Controls/Button/Button.type";
import Button from "../../Common/Controls/Button/Button";

import "./GameButton.css";

interface GameButtonProps {
    icon: IconDefinition;
    onClick: ButtonMouseHandler;
    isDisabled?: boolean;
    className?: string;
    title?: string;
    variant?: string;
}

const GameButton: FC<GameButtonProps> = ({isDisabled = false, onClick, className, title, icon}) => {
    return (
        <Button
            onClick={onClick}
            isDisabled={isDisabled}
            className={classNames('game-btn', className)}
        >
            <FontAwesomeIcon
                icon={icon}
                title={title}
            />
        </Button>
    );
};
export default GameButton;