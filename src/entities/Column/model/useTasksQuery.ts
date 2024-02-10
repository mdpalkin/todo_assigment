import {useQuery} from "@tanstack/react-query";
import {tasksAPI} from "../../../shared/api";
import {BoardType, TaskType} from "../../../shared/api";

export const useGetTasksQuery = () => useQuery({
    queryKey: ['todos'],
    queryFn: tasksAPI.getTasks,
    select: data => {

        const columns: BoardType[] = [
            { id: '1', title: 'Todo', type: 'todo', items: [] },
            { id: '2', title: 'In Progress', type: 'inProgress', items: [] },
            { id: '3', title: 'Done', type: 'done', items: [] },
        ];

        data.data.forEach((task) => {
            const columnIndex = columns.findIndex((column) => column.type === task.column);

            if (columnIndex !== -1) {
                columns[columnIndex].items.push(task);
            }
        });

        columns[0].items.sort( (a: TaskType, b: TaskType) => a.order - b.order)
        columns[1].items.sort( (a: TaskType, b: TaskType) => a.order - b.order)
        columns[2].items.sort( (a: TaskType, b: TaskType) => a.order - b.order)

        return columns;
    }

} )