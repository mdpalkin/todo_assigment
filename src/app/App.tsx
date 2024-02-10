import './App.scss'
import {BoardType, tasksAPI, TaskType} from "../shared/api.ts";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "./main.tsx";
import {Loader} from "../widgets/Loader/Loader.tsx";
import {Column} from "../entities/Column/ui/Column.tsx";
import {useState} from "react";
import {useGetTodosQuery} from "./model/useTodosQuery.ts";


function App() {

    const {data, isFetching, isError} = useGetTodosQuery()

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

    const updateTask = (id: string, changes: Partial<TaskType>) => {
        updateTaskMutation.mutate({id, changes})
    }


    const [currentColumn, setCurrentColumn] = useState<null | BoardType>(null)
    const [currentTask, setCurrentTask] = useState<null | TaskType>(null)

    if (isError) {
        return <div>Some error occurred :(</div>
    }

    return (
        <div className={'drag'}>
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

export default App

