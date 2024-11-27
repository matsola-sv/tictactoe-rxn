import {FC} from "react";
import AppRouter from "../../routers/AppRouter";
import './App.css';

const App: FC = () => {
    return (
        <div className="App">
            <AppRouter/>
        </div>
    );
}
export default App;