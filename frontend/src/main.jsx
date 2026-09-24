import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

import { AuthProvider } from "./context/AuthContext.jsx"

//  AuthProvider wraps the entire app to provide authentication context to all components.

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider> 
            <App />
        </AuthProvider>
    </StrictMode>
)