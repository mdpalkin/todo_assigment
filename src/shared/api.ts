import axios from 'axios';

export const todolistAPI = {
    getTodolists() {
        return axios.get<TodoType[]>('https://jsonplaceholder.typicode.com/todos')
    }
}

export type TodoType = {
    userId: string,
    id: string,
    title: string
    completed: boolean
}