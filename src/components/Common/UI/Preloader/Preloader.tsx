import {FC} from "react";
import logo from "assets/images/logo.svg";

const Preloader: FC = () => {
    return (
        <div className="preloader App-header">
            <img src={logo} className="App-logo" alt="Logo preloader" />
        </div>
    );
}
export default Preloader;