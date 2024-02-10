import {Paper, Typography} from "@mui/material";
import {Task} from "../../Task/ui/Task.tsx";
import {DragEvent} from "react";
import {BoardType, TaskType} from "../../../shared/api.ts";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm.tsx";
import s from './Column.module.scss'
import {v1} from "uuid";

export const Column = ({board, deleteTask, updateTask, addTask, setCurrentBoard, setCurrentItem, currentItem, currentBoard}: Props) => {

    const dragOverHandler = (e: DragEvent<HTMLSpanElement>) => {
        e.preventDefault()
    }


    const dragStartHandler = (board: BoardType, item: TaskType) => {
        console.log("start", currentItem)
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    const dropHandler = (e: DragEvent<HTMLSpanElement>, board: BoardType, item: TaskType) => {
        e.stopPropagation()
        e.preventDefault()
        console.log('drop', currentItem)
        const currentIndex = currentBoard!.items.indexOf(currentItem!)
        currentBoard!.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem!)
        updateTask(currentItem!.id,  {column: board.title})
    }

    const dropCardHandler = (e: DragEvent<HTMLDivElement>, board: BoardType) => {
        e.stopPropagation()
        board.items.push(currentItem!)
        const currentIndex = currentBoard!.items.indexOf(currentItem!)
        currentBoard!.items.splice(currentIndex, 1)
        updateTask(currentItem!.id, {column: board.title})
    }

    const addTaskHandlder = (title: string) => {
        const newTask = {id: v1(), title, column: board.title, order: '0'}
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
                draggable
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
            <AddItemForm callback={addTaskHandlder}/>
        </div>
    </Paper>
}

type Props = {
    board: BoardType
    deleteTask: (taskId: string) => void
    updateTask: (taskId: string, changes: Partial<TaskType>) => void
    addTask: (task: TaskType) => void
    currentBoard: BoardType | null
    currentItem: TaskType | null
    setCurrentBoard: (board: BoardType) => void
    setCurrentItem: (item: TaskType) => void
}