import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://65c619e8e5b94dfca2e0f369.mockapi.io/todolistsapi'
})
export const todolistAPI = {
    getTodolists() {
        return instance.get<TaskType[]>('/tasks')
    },
    addTask(todo: TaskType) {
        return instance.post<TaskType>('/tasks', todo)
    },
    deleteTask(taskId: string) {
        return instance.delete(`/tasks/${taskId}`)
    },
    updateTask(update: {taskId: string, changes: Partial<TaskType>}) {
        return instance.put(`/tasks/${update.taskId}`, update.changes)
    }
}

export type TaskType = {
    todolistId: string,
    id: string,
    title: string
    completed: boolean
}