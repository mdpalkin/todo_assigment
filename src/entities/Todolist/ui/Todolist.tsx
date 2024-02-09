import {Paper, Typography} from "@mui/material";
import {Task} from "../../Task/ui/Task.tsx";
import s from './Todolist.module.scss'
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm.tsx";
import {TaskType} from "../../../shared/api.ts";
import {v1} from "uuid";

export const Todolist = ({todolistId, tasks, addTask, deleteTask, updateTask}: Props) => {

    const addTaskHandler = (title: string) => {
        addTask({id: v1(), title, completed: false, todolistId: todolistId})
    }

    return <Paper className={s.wrapper}>
        <Typography variant={'h4'}>Todolist {todolistId}</Typography>
        <AddItemForm callback={addTaskHandler} />
        <ul>
        {tasks.map(task => <Task  updateTask={updateTask} deleteTask={deleteTask} task={task} />)}
        </ul>
    </Paper>
}

type Props = {
    tasks: TaskType[]
    todolistId: string
    addTask: (task: TaskType) => void
    deleteTask: (id: string) => void
    updateTask: (taskId: string, changes: Partial<TaskType>) => void
}
