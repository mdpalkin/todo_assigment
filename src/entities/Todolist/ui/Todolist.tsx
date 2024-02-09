import {Paper, Typography} from "@mui/material";
import {Task} from "../../Task/ui/Task.tsx";
import s from './Todolist.module.scss'
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm.tsx";
import {TodoType} from "../../../shared/api.ts";

export const Todolist = ({todolistId, tasks}: Props) => {
    return <Paper className={s.wrapper}>
        <Typography variant={'h4'}>Todolist {todolistId}</Typography>
        <AddItemForm callback={() => {}} />
        <ul>
        {tasks.map(task => <Task key={task.id} title={task.title} isDone={task.completed} id={task.id} />)}
        </ul>
    </Paper>
}

type Props = {
    tasks: TodoType[]
    todolistId: string
}
