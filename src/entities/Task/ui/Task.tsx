import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan.tsx";
import s from './Task.module.scss'
import DeleteIcon from "@mui/icons-material/Delete";

export const Task = ({isDone, id, title}: TaskType) => {

     return <li className={s.wrapper} key={id}>
        <div style={{display: 'flex', gap: '20px'}}>
            <Checkbox checked={isDone}/>
            <EditableSpan title={title} onChange={() => {}}/>
        </div>
        <IconButton><DeleteIcon/></IconButton>

    </li>
}

export type TaskType = {
    title: string,
    isDone: boolean
    id: string
}

export type TaskStateType = {
    [key: string]: TaskType[]
}