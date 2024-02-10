import ReactDOM from 'react-dom/client'
import App from "./app";
import {WithProviders} from "./app/providers";


ReactDOM.createRoot(document.getElementById('root')!).render(
        <WithProviders>
            <App/>
        </WithProviders>
)
