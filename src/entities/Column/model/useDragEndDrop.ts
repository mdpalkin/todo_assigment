import {DragEvent} from "react";
import {BoardType, TaskType} from "../../../shared/api.ts";

export const useDragEndDrop = ({updateTask, setCurrentTask, currentTask, setCurrentColumn, currentColumn} : Props) => {
    const dragOverHandler = (e: DragEvent<HTMLSpanElement>) => {
        e.preventDefault()
    }

    const dragStartHandler = (board: BoardType, item: TaskType) => {
        setCurrentColumn(board)
        setCurrentTask(item)
    }

    const dropHandler = (e: DragEvent<HTMLSpanElement>, board: BoardType, item: TaskType) => {
        e.stopPropagation()
        e.preventDefault()
        const currentIndex = currentColumn!.items.indexOf(currentTask!)
        currentColumn!.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentTask!)
        if (board.type !== currentTask?.column) {
            updateTask(currentTask!.id, {column: board.type, order: board.items.length})
        } else {
            updateTask(currentTask!.id, {order: (dropIndex + 1)})
            updateTask(item.id, {order: (currentIndex)})
        }
    }

    const dropCardHandler = (e: DragEvent<HTMLDivElement>, board: BoardType) => {
        e.stopPropagation()
        board.items.push(currentTask!)
        const currentIndex = currentColumn!.items.indexOf(currentTask!)
        currentColumn!.items.splice(currentIndex, 1)
        updateTask(currentTask!.id, {column: board.type})
    }

    return {
        dragOverHandler,
        dragStartHandler,
        dropHandler,
        dropCardHandler
    }
}

type Props = {
    currentTask: TaskType | null
    currentColumn: BoardType | null
    setCurrentTask: (item: TaskType) => void
    setCurrentColumn: (board: BoardType) => void
    updateTask: (taskId: string, task: Partial<TaskType>) => void
}