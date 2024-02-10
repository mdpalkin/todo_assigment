import {IconButton, Paper} from "@mui/material";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan.tsx";
import s from './Task.module.scss'
import DeleteIcon from "@mui/icons-material/Delete";
import {ComponentPropsWithoutRef} from "react";
import {ItemType} from "../../../App.tsx";

export const Task = ({task, ...rest}: Props) => {

    // const deleteTaskHandler = () => {
    //     deleteTask(task.id)
    // }


     return <Paper
         {...rest}
         className={s.wrapper} key={task.id}>
         <EditableSpan title={task.title} onChange={() => {}}/>
        <IconButton onClick={() => {}}><DeleteIcon/></IconButton>
    </Paper>
}


type Props = {
    task: ItemType
} & ComponentPropsWithoutRef<'span'>