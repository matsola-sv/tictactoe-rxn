import {FC} from "react";
import classNames from "classnames";

// Fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoePrints, faSlash} from "@fortawesome/free-solid-svg-icons";

import "components/Common/UI/Icons/NoShoePrintsIcon/NoShoePrintsIcon.css";

interface NoShoePrintsIconProps {
    className?: string;
}

const NoShoePrintsIcon: FC<NoShoePrintsIconProps> = ({ className }) => {
    return (
        <span className={classNames("no-shoe-icon", className)}>
            <FontAwesomeIcon icon={faShoePrints}/>
            <FontAwesomeIcon
                className="no-shoe-icon__crossed"
                icon={faSlash}
            />
        </span>
    );
};
export default NoShoePrintsIcon;