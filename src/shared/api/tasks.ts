import {apiInstance} from "./base.ts";
import {TaskType} from "./models.ts";

const BASE_URL = '/tasks'

export const tasksAPI = {
    async getTasks() {
        return apiInstance.get<TaskType[]>(BASE_URL)
    },
    async addTask(todo: TaskType) {
        return apiInstance.post<TaskType>(BASE_URL, todo)
    },
    async deleteTask(taskId: string) {
        return apiInstance.delete(`${BASE_URL}/${taskId}`)
    },
    async updateTask(model: Partial<TaskType>) {
        return apiInstance.put(`${BASE_URL}/${model.id}`, {...model})
    }
}