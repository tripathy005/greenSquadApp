import React, {createContext, useContext, useState} from 'react'
import { decryptData } from '../utils/secureStorage'

export const AuthContext = createContext()


export default function AuthProvider({ children }) {


    // Check access token
    const initialAccessToken = localStorage.getItem(
        'access_token'
    )


    // Get encrypted user information
    const encryptedUserData = localStorage.getItem(
        'user_info'
    )


    // Decrypt user information
    const initialUserData = decryptData(
        encryptedUserData
    )


    // Authentication state
    const [authUser, setAuthUser] = useState(
        initialAccessToken && initialUserData
            ? true
            : false
    )


    // User role
    const [userRole, setUserRole] = useState(
        initialUserData?.role || null
    )


    // Complete user information
    const [user, setUser] = useState(
        initialUserData || null
    )


    return (
        <AuthContext.Provider
            value={[
                authUser,
                setAuthUser,
                userRole,
                setUserRole,
                user,
                setUser
            ]}
        >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)