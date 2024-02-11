import {useMutation, useQuery} from "@tanstack/react-query";
import {DEFAULT_TODO_STATE, tasksAPI, TaskType} from "../../../shared/api";
import {queryClient} from "../../../app/providers/query-client.tsx";

export const useTasksQuery = () => {

    const getTasks=  useQuery({
        queryKey: ['todos'],
        queryFn: tasksAPI.getTasks,
        select: (data) => {

            const columns = DEFAULT_TODO_STATE

            data.data.forEach((task) => {
                const columnIndex = columns.findIndex((column) => column.type === task.column);

                if (columnIndex !== -1) {
                    columns[columnIndex].items.push(task);
                }
            });

            columns.forEach((column) => {
                column.items.sort((a: TaskType, b: TaskType) => a.order - b.order);
            });

            return columns;
        }

    })

    const addTaskMutation = useMutation({
        mutationFn: tasksAPI.addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
    const addTask = (task: TaskType) => {
        addTaskMutation.mutate(task)
    }



    const deleteTaskMutation = useMutation({
        mutationFn: tasksAPI.deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const deleteTask = (taskId: string) => {
        deleteTaskMutation.mutate(taskId)
    }


    const updateTaskMutation = useMutation({
        mutationFn: tasksAPI.updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const updateTask = (model: Partial<TaskType>) => {
        updateTaskMutation.mutate(model)
    }

    return {getTasks, addTask, deleteTask, updateTask}
}

