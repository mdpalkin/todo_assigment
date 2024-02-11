import {DragEvent} from "react";
import {ColumnType, TaskType} from "shared/api/models.ts";

export const useTasksDnD = ({updateTask, setCurrentTask, currentTask, setCurrentColumn, currentColumn}: Props) => {

    const dragOverHandler = (e: DragEvent<HTMLSpanElement>) => {
        e.preventDefault()
    }

    const dragStartHandler = (board: ColumnType, item: TaskType) => {
        setCurrentColumn(board)
        setCurrentTask(item)
    }

    const dropHandler = (e: DragEvent<HTMLSpanElement>, column: ColumnType, task: TaskType) => {
        e.stopPropagation()
        e.preventDefault()

        const currentIndex = currentColumn!.items.indexOf(currentTask!)
        const dropIndex = column.items.indexOf(task)

        if (column.type !== currentTask?.column) {
            updateTask({id: currentTask!.id, column: column.type, order: column.items.length - 1})
        } else {
            updateTask({id: currentTask.id, order: (dropIndex)})
            updateTask({id: task.id, order: (currentIndex)})
        }

    }

    const dropCardHandler = (e: DragEvent<HTMLDivElement>, board: ColumnType) => {
        e.stopPropagation()

        if (currentTask?.column !== board.type) {
            updateTask({id: currentTask!.id, column: board.type, order: board.items.length})
        }


    }

    return {
        dragOverHandler,
        dragStartHandler,
        dropHandler,
        dropCardHandler
    }
}

type Props = {
    updateTask: (model: Partial<TaskType>) => void
    currentColumn: ColumnType | null
    currentTask: TaskType | null
    setCurrentColumn: (board: ColumnType) => void
    setCurrentTask: (item: TaskType) => void
}