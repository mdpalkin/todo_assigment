import {useTasksQuery} from "../../entities/task";
import {useState} from "react";
import {ColumnType, TaskType} from "../../shared/api";
import s from './styles.module.scss'
import {Loader} from "../../widgets/Loader/Loader.tsx";
import {Column} from "../../entities/column/ui";

export const ColumnsRow = () => {

    const {data, isFetching, isError} = useTasksQuery().getTasks

    const [currentColumn, setCurrentColumn] = useState<null | ColumnType>(null)
    const [currentTask, setCurrentTask] = useState<null | TaskType>(null)

    if (isError) {
        return <div>Some error occurred :(</div>
    }

    return (
        <div className={s.wrapper}>
            {isFetching && <Loader/>}
            {data && data.map(column =>
                <Column column={column}
                        disabled={isFetching}
                        key={column.id}
                        currentColumn={currentColumn}
                        currentTask={currentTask}
                        setCurrentColumn={setCurrentColumn}
                        setCurrentTask={setCurrentTask}
                />)}
        </div>
    )
}