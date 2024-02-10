import './App.scss'
import {TaskType, todolistAPI} from "./shared/api.ts";
import {DragEvent, useState} from "react";
import {Paper, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {Task} from "./entities/Task/ui/Task.tsx";


function App() {

    const {data, isLoading, isError} = useQuery({
        queryKey: ['todos'],
        queryFn: todolistAPI.getBoards,

    } )


    const [boards, setBoards] = useState<BoardType[]>([])

    const [currentBoard, setCurrentBoard] = useState<null | BoardType>(null)
    const [currentItem, setCurrentItem] = useState<null | ItemType>(null)


    //
    // const addTaskMutation = useMutation({
    //     mutationFn: todolistAPI.addTask,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['todos'] })
    //     },
    // })
    //
    // const addTask = (task: TaskType) => {
    //     addTaskMutation.mutate(task)
    // }
    //
    // const deleteTaskMutation = useMutation({
    //     mutationFn: todolistAPI.deleteTask,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['todos'] })
    //     },
    // })
    //
    // const updateBoardMutation = useMutation({
    //     mutationFn: todolistAPI.updateBoard,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['todos'] })
    //     },
    // })
    //
    // const updateTask = (taskId: string, changes: Partial<TaskType>) => {
    //     updateTaskMutation.mutate({taskId, changes})
    // }
    //
    // const deleteTask = (taskId: string) => {
    //     deleteTaskMutation.mutate(taskId)
    // }
    //
    //
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Some error occurred :(</div>
    }


    //
    // const todolists: TodolistType = {
    //     ['1']: [],
    //     ['2']: [],
    //     ['3']: [],
    // }
    // console.log(data)
    //
    // data!.data.forEach((task) => {
    //     return  todolists[task.todolistId] = [...todolists[task.todolistId], task]
    // })

    // TEMPORARY SOLUTION

    const dragOverHandler = (e: DragEvent<HTMLSpanElement>) => {
        e.preventDefault()
        // if (e.target.className === 'item') {
        //     e.target.boxShadow = '0 2px 3px gray'
        // }
    }


    // const dragLeaveHandler = (e:  DragEvent<HTMLSpanElement>) => {
            // e.target.boxShadow = 'none'
    // }

    const dragStartHandler = (board: BoardType, item: ItemType) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    // const dragEndHandler = (e:  DragEvent<HTMLSpanElement>) => {
    //     // e.target.boxShadow = 'none'
    // }

    const dropHandler = (e: DragEvent<HTMLSpanElement>, board: BoardType, item: ItemType ) => {
        e.stopPropagation()
        e.preventDefault()
        const currentIndex = currentBoard!.items.indexOf(currentItem!)
        currentBoard!.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem!)
        setBoards(boards.map(b => {
            if (b.id === board.id) return board
            if (b.id === currentBoard?.id) return  currentBoard
            return b
        }))
    }

    const dropCardHandler = (e: DragEvent<HTMLDivElement>, board: BoardType) => {
        e.stopPropagation()
        board.items.push(currentItem!)
        const currentIndex = currentBoard!.items.indexOf(currentItem!)
        currentBoard!.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) return board
            if (b.id === currentBoard?.id) return  currentBoard
            return b
        }))
    }





    return (

        <div className={'drag'}>
            {data!.data.map(board => <Paper
                elevation={6}
                key={board.id}
                className={'column'}
                onDragOver={e => dragOverHandler(e)  }
                onDrop={e => dropCardHandler(e, board)}
            >
                <Typography variant={'h4'}>{board.title}</Typography>
                {board.items.map(item => <Task
                        key={item.id}
                        className={'item'}
                        draggable
                        // onDragLeave={e => dragLeaveHandler(e)}
                        onDragStart={() => dragStartHandler(board, item)}
                        // onDragEnd={e => dragEndHandler(e)}
                        onDrop={e => dropHandler(e, board, item)}
                        onDragOver={(e) => dragOverHandler(e)}
                        task={item}
                    >{item.title}
                    </Task>
                )}
            </Paper>)}
        </div>
      // <div className={'App'}>{
      //     Object.keys(todolists).map(id => <Todolist
      //         todolistId={id}
      //         tasks={todolists[id]}
      //         addTask={addTask}
      //         deleteTask={deleteTask}
      //         updateTask={updateTask}
      //     />)
      // }</div>
  )
}

export type TodolistType = {[key: string]: TaskType[]}
export default App

export type ItemType = {
    id: number,
    title: string
}

export type BoardType = {
    id: number
    title: string,
    items: ItemType[]
}