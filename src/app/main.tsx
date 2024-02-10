import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={darkTheme}>
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <App/>
        </QueryClientProvider>,
    </ThemeProvider>
)
