import {useGetTasksQuery} from "../../entities/Column/model/useTasksQuery.ts";
import {useMutation} from "@tanstack/react-query";
import {BoardType, tasksAPI, TaskType} from "../../shared/api";
import {useState} from "react";
import {Loader} from "../../widgets/Loader/Loader.tsx";
import {Column} from "../../entities/Column/ui/Column.tsx";
import s from './styles.module.scss'
import {queryClient} from "../../app/providers/query-client.tsx";

export const ColumnsRow = () => {
    const {data, isFetching, isError} = useGetTasksQuery()

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


    const [currentColumn, setCurrentColumn] = useState<null | BoardType>(null)
    const [currentTask, setCurrentTask] = useState<null | TaskType>(null)

    if (isError) {
        return <div>Some error occurred :(</div>
    }

    return (
        <div className={s.wrapper}>
            {isFetching && <Loader/>}
            {data && data.map(board =>
                <Column board={board}
                        disabled={isFetching}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                        addTask={addTask}
                        key={board.id}
                        currentColumn={currentColumn}
                        currentTask={currentTask}
                        setCurrentColumn={setCurrentColumn}
                        setCurrentTask={setCurrentTask}
                />)}
        </div>
    )
}