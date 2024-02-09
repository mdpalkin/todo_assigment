import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan.tsx";
import s from './Task.module.scss'
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../../../shared/api.ts";

export const Task = ({task, deleteTask, updateTask}: Props) => {

    const deleteTaskHandler = () => {
        deleteTask(task.id)
    }

    const changeTaskTitleHandler = (title: string) => {
        updateTask(task.id, {title})
    }

    const changeTaskStatusHandler = () => {
        updateTask(task.id, {completed: !task.completed})
    }


     return <li className={s.wrapper} key={task.id}>
        <div style={{display: 'flex', gap: '20px'}}>
            <Checkbox onChange={changeTaskStatusHandler} checked={task.completed}/>
            <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
        </div>
        <IconButton onClick={deleteTaskHandler}><DeleteIcon/></IconButton>

    </li>
}


type Props = {
    task: TaskType
    deleteTask: (taskId: string) => void
    updateTask: (taskId: string, changes: Partial<TaskType>) => void
}