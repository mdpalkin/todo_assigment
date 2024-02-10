import {ReactNode} from "react";
import {WithQueryClient} from "./query-client.tsx";
import {WithTheme} from "./theme.tsx";

export const WithProviders = ({children}: Props) => {
    return <>
    <WithQueryClient>
        <WithTheme>
            {children}
        </WithTheme>
    </WithQueryClient>
    </>
}

type Props = {
    children: ReactNode
}