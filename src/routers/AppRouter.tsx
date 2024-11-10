import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as ROUTES from "../constants/routes";

import HomePage from "../pages/Home";
import GamesPage from "../pages/Games";
import NotFoundPage from "../pages/errors/NotFound";
import Navigator from "../components/Common/Navigator/Navigator";

function AppRouter() {
    return (
        <BrowserRouter>
            <Navigator/>
            <Routes>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path={ROUTES.HOME} element={<HomePage/>}/>
                <Route path={ROUTES.GAMES} element={<GamesPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;