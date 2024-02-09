import './App.scss'
import {Todolist} from "./entities/Todolist/ui/Todolist.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {todolistAPI, TaskType} from "./shared/api.ts";
import {queryClient} from "./main.tsx";

function App() {

    const {data, isLoading, isError} = useQuery({ queryKey: ['todos'], queryFn: todolistAPI.getTodolists })

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

    const updateTaskMutation = useMutation({
        mutationFn: todolistAPI.updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const updateTask = (taskId: string, changes: Partial<TaskType>) => {
        updateTaskMutation.mutate({taskId, changes})
    }

    const deleteTask = (taskId: string) => {
        deleteTaskMutation.mutate(taskId)
    }


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Some error occurred :(</div>
    }

    const todolists: TodolistType = {
        ['1']: [],
        ['2']: [],
        ['3']: [],
    }
    console.log(data)

    data!.data.forEach((task) => {
        return  todolists[task.todolistId] = [...todolists[task.todolistId], task]
    })

    return (
      <div className={'App'}>{
          Object.keys(todolists).map(id => <Todolist
              todolistId={id}
              tasks={todolists[id]}
              addTask={addTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
          />)
      }</div>
  )
}

export type TodolistType = {[key: string]: TaskType[]}
export default App
