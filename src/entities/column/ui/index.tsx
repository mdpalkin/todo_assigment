import {Paper, Typography} from "@mui/material";
import s from './styles.module.scss'
import {v1} from "uuid";
import {ColumnType, TaskType} from "shared/api/models.ts";
import {AddItemForm} from "../../../features/AddItemForm";
import {useTasksDnD} from "../model/useTasksDnD.ts";
import {Task, useTasksQuery} from "../../Task";

export const Column = ({column, disabled, currentColumn, setCurrentColumn, setCurrentTask, currentTask}: Props) => {

    const {updateTask, addTask} = useTasksQuery()

    const {
        dragOverHandler,
        dragStartHandler,
        dropHandler,
        dropCardHandler
    } = useTasksDnD({updateTask, setCurrentColumn, currentColumn, setCurrentTask, currentTask})


    const addTaskHandler = (title: string) => {
        const newTask = {id: v1(), title, column: column.type, order: column.items.length}
        addTask(newTask)
    }

    return <Paper
        elevation={6}
        key={column.id}
        className={s.column}
        onDragOver={e => dragOverHandler(e)}
        onDrop={e => dropCardHandler(e, column)}
    >
        <Typography variant={'h2'} style={{fontSize: '23px'}}>{column.title}</Typography>
        {column.items.map(item => <Task
                key={item.id}
                draggable={!disabled}
                onDragStart={() => dragStartHandler(column, item)}
                onDrop={e => dropHandler(e, column, item)}
                onDragOver={(e) => dragOverHandler(e)}
                task={item}
            >{item.title}
            </Task>
        )}
        <div className={s.form}>
            <AddItemForm callback={addTaskHandler}/>
        </div>
    </Paper>
}

type Props = {
    column: ColumnType
    currentColumn: ColumnType | null
    currentTask: TaskType | null
    setCurrentColumn: (board: ColumnType) => void
    setCurrentTask: (item: TaskType) => void
    disabled?: boolean
}