import {Paper, Typography} from "@mui/material";
import {Task} from "../../Task/ui/Task.tsx";
import {BoardType, TaskType} from "../../../shared/api.ts";
import {AddItemForm} from "../../../features/AddItemForm/AddItemForm.tsx";
import s from './Column.module.scss'
import {v1} from "uuid";
import {useDragEndDrop} from "../model/useDragEndDrop.ts";

export const Column = ({
                           board,
                           deleteTask,
                           updateTask,
                           addTask,
                           setCurrentColumn,
                           setCurrentTask,
                           currentTask,
                           disabled,
                           currentColumn
                       }: Props) => {


    const {
        dragOverHandler,
        dragStartHandler,
        dropHandler,
        dropCardHandler
    } = useDragEndDrop({setCurrentTask, setCurrentColumn, currentTask, currentColumn, updateTask})

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
        <Typography variant={'h4'}>{board.title}</Typography>
        {board.items.map(item => <Task
                key={item.id}
                className={'item'}
                draggable={!disabled}
                onDragStart={() => dragStartHandler(board, item)}
                onDrop={e => dropHandler(e, board, item)}
                onDragOver={(e) => dragOverHandler(e)}
                task={item}
                deleteTask={deleteTask}
                updateTask={updateTask}
            >{item.title}
            </Task>
        )}
        <div className={s.form}>
            <AddItemForm callback={addTaskHandler}/>
        </div>
    </Paper>
}

type Props = {
    board: BoardType
    deleteTask: (taskId: string) => void
    updateTask: (taskId: string, changes: Partial<TaskType>) => void
    addTask: (task: TaskType) => void
    currentColumn: BoardType | null
    currentTask: TaskType | null
    setCurrentColumn: (board: BoardType) => void
    setCurrentTask: (item: TaskType) => void
    disabled?: boolean
}