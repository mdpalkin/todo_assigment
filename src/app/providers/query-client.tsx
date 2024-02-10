import {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})
export const WithQueryClient = ({children}: Props) => {

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}

type Props = {
    children: ReactNode
}

