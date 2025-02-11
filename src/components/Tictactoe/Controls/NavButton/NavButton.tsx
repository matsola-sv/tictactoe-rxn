import {FC} from "react";
import classNames from "classnames";
// Font Awesome
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
// Models
import {NavDirection} from "../../../../models/lists";
// Components
import GameButton from "../GameButton/GameButton";

interface NavButtonProps {
    direction: NavDirection;
    onClick: () => void;
    isDisabled: boolean;
    className?: string;
}

const NavButton: FC<NavButtonProps> = ({ direction, onClick, isDisabled, className = "" }) => {
    const icon = direction === NavDirection.Back ? faAngleLeft : faAngleRight;

    return (
        <GameButton
            icon={icon}
            className={classNames("btn-nav", className)}
            isDisabled={isDisabled}
            onClick={onClick}
        />
    );
};
export default NavButton;