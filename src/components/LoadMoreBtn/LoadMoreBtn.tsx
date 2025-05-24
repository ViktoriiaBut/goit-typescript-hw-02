import { SyncLoader } from "react-spinners";
import s from "./LoadMoreBtn.module.css";

type Props = {
    onClick: () => void;
    loadMore: boolean;
};

const LoadMoreBtn: React.FC<Props> = ({ onClick, loadMore }) => {
    return (
        <div className={s.loadContainer}>
            <button className={s.loadBtn} onClick={onClick} disabled={loadMore}>
                {loadMore ? <SyncLoader color="gray" size={20} /> : "Load more"}
           </button>
        </div>
    )
}

export default LoadMoreBtn;

