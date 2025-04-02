import {FC} from "react";
import {Link} from "react-router-dom";
// Routers
import * as ROUTES from "constants/routes";
// Styles
import 'components/Common/Navigator/Navigator.css';

/**
 * Since the basename is already set in BrowserRouter,
 * each path used in the Link components will automatically
 * include this base path, so there's no need to call getPublicUrl
 * for each link.
 */
const Navigator: FC = () => {
    return (
        <nav className="menu">
            <ul className="horizontal">
                <li><Link to={ROUTES.HOME}>Home</Link></li>
                <li><Link to={ROUTES.GAMES}>Tic tac toe</Link></li>
            </ul>
        </nav>
    );
}
export default Navigator;