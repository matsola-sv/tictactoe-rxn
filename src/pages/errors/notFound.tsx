import {BackButton} from "../../components/common/buttons/back";

export function NotFoundPage() {
    return (
        <div className="page-not-found">
            <h1>:( Page you are looking for does not exists.</h1>
            <br />
            <BackButton/>
        </div>
    );
}