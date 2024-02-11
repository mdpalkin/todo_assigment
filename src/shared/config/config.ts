import {ColumnType} from "../api";

export const API_URL = 'https://65c619e8e5b94dfca2e0f369.mockapi.io/todolistsapi'

export const DEFAULT_TODO_STATE: ColumnType[] = [
    { id: '1', title: 'Todo', type: 'todo', items: [] },
    { id: '2', title: 'In Progress', type: 'inProgress', items: [] },
    { id: '3', title: 'Done', type: 'done', items: [] },
];