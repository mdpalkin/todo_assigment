import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://65c619e8e5b94dfca2e0f369.mockapi.io/todolistsapi'
})
export const tasksAPI = {
    async getTasks() {
        return instance.get<TaskType[]>('/tasks')
    },
    async addTask(todo: TaskType) {
        return instance.post<TaskType>('/tasks', todo)
    },
    async deleteTask(taskId: string) {
        return instance.delete(`/tasks/${taskId}`)
    },
    async updateTask(update: {id: string, changes: Partial<TaskType>}) {
        return instance.put(`/tasks/${update.id}`, {...update.changes})
    }
}

export type TaskType = {
    id: string,
    title: string,
    column: ColumnsType
    order: number
}

export type BoardType = {
    id: string
    type: ColumnsType
    title: string
    items: TaskType[]
}

export type ColumnsType = "todo" | "inProgress" | "done"