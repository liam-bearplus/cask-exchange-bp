import ActionHeader from "../action";
import CaskList from "../list";

export default function Content() {
    return (
        <div className="container grid grid-cols-12">
            <div className="col-start-2 -col-end-2">
                <ActionHeader />
            </div>
            <div className="col-start-2 -col-end-2">
                <CaskList />
            </div>
        </div>
    );
}
