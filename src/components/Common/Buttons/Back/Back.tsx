import {useNavigate} from "react-router-dom";
import {FC} from "react";

const BackButton: FC = () => {
    const navigator = useNavigate();
    const backHandler = () => navigator(-1);

    return (
        <button className="btn back"
                onClick={backHandler}
        >
            <i className="fa fa-chevron-left">Go back</i>
        </button>
    );
};
export default BackButton;