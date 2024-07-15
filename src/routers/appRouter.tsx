import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as ROUTES from "../constants/routes";

import {Navigator} from "../components/common/navigator";
import {NotFoundPage} from "../pages/errors/notFound";
import {HomePage} from "../pages/home";
import {GamesPage} from "../pages/games";

export function AppRouter() {
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