import {IconButton, Paper} from "@mui/material";
import {EditableSpan} from "../../../features/EditableSpan/ui.tsx";
import s from './styles.module.scss'
import DeleteIcon from "@mui/icons-material/Delete";
import {ComponentPropsWithoutRef} from "react";
import {TaskType} from "../../../shared/api/models.ts";

export const Task = ({task, deleteTask, updateTask, ...rest}: Props) => {

    const deleteTaskHandler = () => {
        deleteTask(task.id)
    }

    const changeTaskTitle = (title: string) => {
        updateTask({id: task.id, title })
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
    updateTask: (model: Partial<TaskType>) => void
} & ComponentPropsWithoutRef<'span'>