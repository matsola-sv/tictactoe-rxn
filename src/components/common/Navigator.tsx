import {FC} from "react";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Navigator: FC = () => {
    return (
        <nav className="menu">
            <ul className="horizontal">
                <li><Link to={ROUTES.HOME}>Home</Link></li>
                <li><Link to={ROUTES.GAMES}>Play tic tac toe</Link></li>
            </ul>
        </nav>
    );
}
export default Navigator;