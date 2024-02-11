import {DragEvent} from "react";
import {ColumnType, TaskType} from "shared/api/models.ts";

export const useTasksDnD = ({updateTask, setCurrentTask, currentTask, setCurrentColumn, currentColumn} : Props) => {

    const dragOverHandler = (e: DragEvent<HTMLSpanElement>) => {
        e.preventDefault()
    }

    const dragStartHandler = (board: ColumnType, item: TaskType) => {
        setCurrentColumn(board)
        setCurrentTask(item)
    }

    const dropHandler = (e: DragEvent<HTMLSpanElement>, board: ColumnType, item: TaskType) => {
            e.stopPropagation();
            e.preventDefault();

            const newItems = [...board.items];
            const currentIndex = currentColumn!.items.indexOf(currentTask!);
            const dropIndex = newItems.indexOf(item);

            newItems.splice(currentIndex, 1);
            newItems.splice(dropIndex + 1, 0, currentTask!);

            const updatedItems = newItems.map((task, index) => ({
                ...task,
                order: index,
            }));

            setCurrentColumn({
                ...currentColumn!,
                items: updatedItems,
            });

            updateTask({
                id: currentTask!.id,
                column: board.type,
                order: dropIndex + 1,
            });

    }

    const dropCardHandler = (e: DragEvent<HTMLDivElement>, board: ColumnType) => {
        e.stopPropagation()
        board.items.push(currentTask!)
        const currentIndex = currentColumn!.items.indexOf(currentTask!)
        currentColumn!.items.splice(currentIndex, 1)
        updateTask( {id: currentTask!.id, column: board.type})
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