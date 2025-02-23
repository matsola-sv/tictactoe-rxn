import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as ROUTES from "../constants/routes";
import GamesPage from "../pages/Games";
import NotFoundPage from "../pages/errors/NotFound";

function AppRouter() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,   // Enables React`s transition API for Router v7
                v7_relativeSplatPath: true  // Updates relative path behavior for splat routes (*)
            }}
        >
            {/*<Navigator/>*/}
            <Routes>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path={ROUTES.HOME} element={<GamesPage/>}/>
                {/*<Route path={ROUTES.GAMES} element={<GamesPage/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;