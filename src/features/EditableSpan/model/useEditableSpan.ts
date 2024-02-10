import {ChangeEvent, useState} from "react";

export const useEditableSpan = ({onChange, title}: Props) => {
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

    return {text, editMode, textHandler, activateViewMode, onBlurHandler}
}

type Props = {
    onChange: (newTitle: string) => void
    title: string
}