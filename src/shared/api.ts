import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://65c619e8e5b94dfca2e0f369.mockapi.io/todolistsapi'
})
export const todolistAPI = {
    getBoards() {
        return instance.get<TaskType[]>('/tasks')
    },
    addTask(todo: TaskType) {
        return instance.post<TaskType>('/tasks', todo)
    },
    deleteTask(taskId: string) {
        return instance.delete(`/tasks/${taskId}`)
    },
    updateTask(update: {id: string, changes: Partial<TaskType>}) {
        return instance.put(`/tasks/${update.id}`, {...update.changes})
    }
}

export type TaskType = {
    id: string,
    title: string,
    column: Columns
    order: string
}

export type BoardType = {
    id: string
    title: Columns,
    items: TaskType[]
}

export type Columns = "todo" | "inProgress" | "done"