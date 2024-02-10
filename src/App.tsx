import './App.scss'
import {BoardType, Columns, TaskType, todolistAPI} from "./shared/api.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {queryClient} from "./main.tsx";
import {Loader} from "./components/Loader/Loader.tsx";
import {Column} from "./entities/Todolist/ui/Column.tsx";
import {useState} from "react";


function App() {

    const {data, isFetching, isLoading, isError} = useQuery({
        queryKey: ['todos'],
        queryFn: todolistAPI.getBoards,

    } )

    const addTaskMutation = useMutation({
        mutationFn: todolistAPI.addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
    const addTask = (task: TaskType) => {
        addTaskMutation.mutate(task)
    }



    const deleteTaskMutation = useMutation({
        mutationFn: todolistAPI.deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const deleteTask = (taskId: string) => {
        deleteTaskMutation.mutate(taskId)
    }


    const updateTaskMutation = useMutation({
        mutationFn: todolistAPI.updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const updateTask = (id: string, changes: Partial<TaskType>) => {
        updateTaskMutation.mutate({id, changes})
    }


    const [currentBoard, setCurrentBoard] = useState<null | BoardType>(null)
    const [currentItem, setCurrentItem] = useState<null | TaskType>(null)


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <div>Some error occurred :(</div>
    }

    const rawBoards: BoardType[] = [
        {id: '1', title: 'todo', items: []},
        {id: '2', title: 'inProgress', items: []},
        {id: '3', title: 'done', items: []},
    ]

    data.data.forEach(task => {
        if (task.column === 'todo') rawBoards[0].items.push(task)
        if (task.column === 'inProgress') rawBoards[1].items.push(task)
        if (task.column === 'done') rawBoards[2].items.push(task)
    })


    return (

        <div className={'drag'}>
            {isFetching && <Loader/>}
            {rawBoards.map(board =>
                <Column board={board}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                        addTask={addTask}
                        key={board.id}
                        currentBoard={currentBoard}
                        currentItem={currentItem}
                        setCurrentBoard={setCurrentBoard}
                        setCurrentItem={setCurrentItem}
                />)}
        </div>
  )
}

export default App

