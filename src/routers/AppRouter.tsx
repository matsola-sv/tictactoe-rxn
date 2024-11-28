import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as ROUTES from "../constants/routes";

import HomePage from "../pages/Home";
import GamesPage from "../pages/Games";
import NotFoundPage from "../pages/errors/NotFound";
import Navigator from "../components/Common/Navigator/Navigator";

function AppRouter() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,   // Enables React`s transition API for Router v7
                v7_relativeSplatPath: true  // Updates relative path behavior for splat routes (*)
            }}
        >
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