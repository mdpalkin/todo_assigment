import {Paper, Typography} from "@mui/material";
import s from './styles.module.scss'
import {v1} from "uuid";
import {ColumnType, TaskType} from "shared/api/models.ts";
import {AddItemForm} from "../../../features/AddItemForm";
import {useDragEndDrop} from "../model/useDragEndDrop.ts";
import {Task, useTasksQuery} from "../../task";

export const Column = ({board, disabled, currentColumn, setCurrentColumn, setCurrentTask, currentTask}: Props) => {

    const {updateTask, addTask} = useTasksQuery()

    const {
        dragOverHandler,
        dragStartHandler,
        dropHandler,
        dropCardHandler
    } = useDragEndDrop({updateTask, setCurrentColumn, currentColumn, setCurrentTask, currentTask})


    const addTaskHandler = (title: string) => {
        const newTask = {id: v1(), title, column: board.type, order: board.items.length}
        addTask(newTask)
    }

    return <Paper
        elevation={6}
        key={board.id}
        className={s.column}
        onDragOver={e => dragOverHandler(e)}
        onDrop={e => dropCardHandler(e, board)}
    >
        <Typography variant={'h2'} style={{fontSize: '23px'}}>{board.title}</Typography>
        {board.items.map(item => <Task
                key={item.id}
                draggable={!disabled}
                onDragStart={() => dragStartHandler(board, item)}
                onDrop={e => dropHandler(e, board, item)}
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
    board: ColumnType
    currentColumn: ColumnType | null
    currentTask: TaskType | null
    setCurrentColumn: (board: ColumnType) => void
    setCurrentTask: (item: TaskType) => void
    disabled?: boolean
}