import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {ReactNode} from "react";

export const WithTheme = ({children}: Props) => {

        const darkTheme = createTheme({
                palette: {
                        mode: 'dark',
                },
        });

        return <ThemeProvider theme={darkTheme}>
                {children}
                <CssBaseline />
        </ThemeProvider>
}

type Props = {
        children: ReactNode
}

