import logo from "../../../assets/images/logo.svg";
import {FC} from "react";

const Preloader: FC = () => {
    return (
        <div className="preloader App-header">
            <img src={logo} className="App-logo" alt="Logo preloader" />
        </div>
    );
}
export default Preloader;