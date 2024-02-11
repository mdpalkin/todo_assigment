import {memo} from "react";
import {TextField, Typography} from "@mui/material";
import s from './styles.module.scss'
import {useEditableSpan} from "../model/index.js";

export const EditableSpan = memo(({disabled, title, onChange}: Props) => {


    const {text, editMode, textHandler, activateViewMode, onBlurHandler} = useEditableSpan({title, onChange})

    return (
        <div>
            {editMode && !disabled
                ? <TextField value={text} variant={'standard'} size={'small'} autoFocus onChange={textHandler} onBlur={onBlurHandler}/>
                : <Typography className={s.wrapper} style={{display: 'flex', alignItems: 'center'}} onDoubleClick={activateViewMode}>{title}</Typography>
            }
        </div>
    )
})

type Props = {
    disabled?: boolean,
    title: string
    onChange: (newTitle: string) => void
}