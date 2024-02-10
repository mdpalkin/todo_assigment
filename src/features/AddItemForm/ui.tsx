import {memo} from "react";
import s from './styles.module.scss'
import {IconButton, TextField, Typography} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useAddItem} from "./model/useAddItem.ts";

export const AddItemForm = memo(({disabled = false, callback}: Props) => {

    const {error,
        onKeyPressHandler,
        onNewTitleChangeHandler,
        text,
        callBackHandler} = useAddItem({callback})

    return (
        <div>
            <div className={s.wrapper}>
                <TextField
                    size={'small'}
                    disabled={disabled}
                    placeholder={'Type here...'}
                    style={{width: 'auto'}}
                    onChange={onNewTitleChangeHandler}
                    value={text}
                    onKeyDown={onKeyPressHandler}
                    className={error ? s.error : ''}
                    variant={'standard'}
                />
                <IconButton disabled={disabled} onClick={callBackHandler}><AddCircleOutlineIcon /></IconButton>
            </div>
            {error && <Typography className={s.errorMessage}>{error}</Typography>}
        </div>
    )
})

type Props = {
    callback: (text: string) => void
    disabled?: boolean
}