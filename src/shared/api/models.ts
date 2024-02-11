export type TaskType = {
    id: string,
    title: string,
    column: ColumnsType
    order: number
}

export type ColumnType = {
    id: string
    type: ColumnsType
    title: string
    items: TaskType[]
}

export type ColumnsType = "todo" | "inProgress" | "done"