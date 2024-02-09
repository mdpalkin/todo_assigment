import './App.scss'
import {Todolist} from "./entities/Todolist/ui/Todolist.tsx";
import {useQuery} from "@tanstack/react-query";
import {todolistAPI, TodoType} from "./shared/api.ts";

function App() {

    const {data, isLoading, isError} = useQuery({ queryKey: ['todos'], queryFn: todolistAPI.getTodolists })

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
        ['4']: [],
        ['5']: [],
        ['6']: [],
        ['7']: [],
        ['8']: [],
        ['9']: [],
        ['10']: [],

    }

    data!.data.forEach((task) => {
        return  todolists[task.userId] = [...todolists[task.userId], task]
    })

    return (
      <div>{
          Object.keys(todolists).map(id => <Todolist todolistId={id} tasks={todolists[id]} />)
      }</div>
  )
}

export type TodolistType = {[key: string]: TodoType[]}
export default App
