import {FC} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../../Controls/Button/Button";

const BackButton: FC = () => {
    const navigator = useNavigate();
    const backHandler = () => navigator(-1);

    return (
        <Button
            className={"btn back"}
            onClick={backHandler}
        >
            <i className="fa fa-chevron-left">Go back</i>
        </Button>
    );
};
export default BackButton;