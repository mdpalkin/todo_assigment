import {memo} from "react";
import {TextField, Typography} from "@mui/material";
import {useEditableSpan} from "./model";

export const EditableSpan = memo(({disabled, title, onChange}: Props) => {


    const {text, editMode, textHandler, activateViewMode, onBlurHandler} = useEditableSpan({title, onChange})

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