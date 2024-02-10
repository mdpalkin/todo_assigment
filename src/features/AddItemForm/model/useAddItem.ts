import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItem = ({ callback } : Props) => {
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

    return {error, onKeyPressHandler, onNewTitleChangeHandler, text, callBackHandler}
}

type Props = {
    callback: (text: string) => void
}