import React, {FC} from "react";
// Components
import AppRouter from "../../routers/AppRouter";
import MediaQueryProvider from "../Providers/MediaQueryProvider/MediaQueryProvider";
// Styles
import './App.css';

const App: FC = () => {
    return (
        <MediaQueryProvider>
            <div className="App">
                <AppRouter/>
            </div>
        </MediaQueryProvider>
    );
}
export default App;