import {IconButton, Paper} from "@mui/material";
import {EditableSpan} from "../../../features/EditableSpan";
import s from './styles.module.scss'
import DeleteIcon from "@mui/icons-material/Delete";
import {ComponentPropsWithoutRef} from "react";
import {TaskType} from "../../../shared/api";
import {useTasksQuery} from "../model";

export const Task = ({task, ...rest}: Props) => {

    const {deleteTask, updateTask} = useTasksQuery()

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
} & ComponentPropsWithoutRef<'span'>