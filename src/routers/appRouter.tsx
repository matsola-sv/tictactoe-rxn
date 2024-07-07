import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as ROUTES from "../constants/routes";

import {HomePage} from "../pages/home";
import {NotFoundPage} from "../pages/errors/notFound";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<HomePage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}