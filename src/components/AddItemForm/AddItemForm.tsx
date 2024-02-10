import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import s from './AddItemForm.module.scss'
import {IconButton, TextField, Typography} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export const AddItemForm = memo(({disabled = false, callback}: Props) => {

    const [text, setText] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
        setError(null)
    }

    const callBackHandler = () => {

        const cutTitle = text.trim()

        if (cutTitle !== '') {
            callback(cutTitle)
            setText('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') callBackHandler()
    }


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