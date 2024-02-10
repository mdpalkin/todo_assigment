import {IconButton, Paper} from "@mui/material";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan.tsx";
import s from './Task.module.scss'
import DeleteIcon from "@mui/icons-material/Delete";
import {ComponentPropsWithoutRef} from "react";
import {TaskType} from "../../../shared/api.ts";

export const Task = ({task, deleteTask, updateTask, ...rest}: Props) => {

    const deleteTaskHandler = () => {
        deleteTask(task.id)
    }

    const changeTaskTitle = (title: string) => {
        updateTask(task.id, {title})
    }

     return <Paper
         {...rest}
         className={s.wrapper} key={task.id}>
         <EditableSpan title={task.title} onChange={changeTaskTitle}/>
        <IconButton onClick={deleteTaskHandler}><DeleteIcon/></IconButton>
    </Paper>
}


type Props = {
    task: TaskType
    deleteTask: (id: string) => void
    updateTask: (taskId: string, changes: Partial<TaskType>) => void
} & ComponentPropsWithoutRef<'span'>