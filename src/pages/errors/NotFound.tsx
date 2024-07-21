import {FC} from "react";
import BackButton from "../../components/common/buttons/Back";

const NotFoundPage: FC = () => {
    return (
        <div className="page-not-found">
            <h1>:( Page you are looking for does not exists.</h1>
            <br />
            <BackButton/>
        </div>
    );
}
export default NotFoundPage;