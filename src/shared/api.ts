import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://65c619e8e5b94dfca2e0f369.mockapi.io/todolistsapi'
})
export const todolistAPI = {
    getBoards() {
        return instance.get<BoardType[]>('/tasks')
    },
    addTask(todo: TaskType) {
        return instance.post<TaskType>('/tasks', todo)
    },
    deleteTask(taskId: string) {
        return instance.delete(`/tasks/${taskId}`)
    },
    updateBoard(update: BoardType[]) {
        return instance.put(`/tasks`, update)
    }
}

export type TaskType = {
    todolistId: string,
    id: string,
    title: string
    completed: boolean
}

type ItemType = {
    id: number,
    title: string
}

type BoardType = {
    id: number
    title: string,
    items: ItemType[]
}