// frontend/src/context/AuthContext.jsx
// this file is responsible for creating a React context for authentication,
// - which allows components to access authentication-related data and functions
// - without having to pass props down through the component tree.
// it exports two functions: AuthProvider and useAuth, 
// -which provide the context value and a hook for consuming the context, respectively.

/**
 * AuthContext is a central place where React keeps the current user's login information and 
 * makes it available to many components.
 */

import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser } from "../services/auth.service"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function restoreAuthentication() {

            try {

                const data = await getCurrentUser()

                setUser(data.user)
                setIsAuthenticated(true)

            } catch (error) {

                setUser(null)
                setIsAuthenticated(false)

            } finally {

                setLoading(false)

            }
        }

        restoreAuthentication()

    }, [])


    function login(userData) {
        setUser(userData)
        setIsAuthenticated(true)
    }


    function logout() {
        setUser(null)
        setIsAuthenticated(false)
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext)
}


/**
 * AuthContext doesn't authenticate the user.
 *  The backend authenticates the user.
 *  AuthContext tells the React application what the current authentication state is.
  
BACKEND
"Is this user really authenticated?"
          ↓
        YES
          ↓
      JWT Cookie


FRONTEND
"Okay, this user is logged in."
          ↓
     AuthContext
          ↓
Dashboard / Navbar / Protected Routes
 
 */