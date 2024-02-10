import {ChangeEvent, memo, useState} from "react";
import {TextField, Typography} from "@mui/material";

export const EditableSpan = memo(({disabled, title, onChange}: Props) => {

    const [text, setText] = useState('')
    const [editMode, setEditMode] = useState(false)

    const activateViewMode = () => {
        setEditMode(true)
        setText(title)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        onChange(text)
    }

    const textHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
    }


    return (
        <>
            {editMode && !disabled
                ? <TextField value={text} variant={'standard'} size={'small'} autoFocus onChange={textHandler} onBlur={onBlurHandler}/>
                : <Typography style={{display: 'flex', alignItems: 'center'}} onDoubleClick={activateViewMode}>{title}</Typography>
            }
        </>
    )
})

type Props = {
    disabled?: boolean,
    title: string
    onChange: (newTitle: string) => void
}