import {useTasksQuery} from "../../entities/task";
import {Loader} from "../../widgets/Loader/Loader.tsx";
import {Column} from "../../entities/column/ui";
import s from './styles.module.scss'
import {useState} from "react";
import {ColumnType, TaskType} from "../../shared/api";

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
            {data && data.map(board =>
                <Column board={board}
                        disabled={isFetching}
                        key={board.id}
                        currentColumn={currentColumn}
                        currentTask={currentTask}
                        setCurrentColumn={setCurrentColumn}
                        setCurrentTask={setCurrentTask}
                />)}
        </div>
    )
}