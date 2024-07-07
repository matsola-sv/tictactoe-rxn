import logo from "../../assets/images/logo.svg";

export function Preloader() {
    return (
        <div className="preloader App-header">
            <img src={logo} className="App-logo" alt="Logo preloader" />
        </div>
    );
}