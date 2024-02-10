import {CircularProgress} from "@mui/material";
import s from './Loader.module.scss'
export const Loader = () => {
    return (
    <div className={s.loader}>
        <CircularProgress size={80}/>
    </div>
    )
}