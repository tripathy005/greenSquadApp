import React, {
    createContext,
    useContext,
    useState
} from "react";

import {
    getSecureItem,
    setSecureItem,
    removeSecureItem
} from "../utils/secureStorage";

export const AuthContext = createContext();


export default function AuthProvider({ children }) {

    const [authUser, setAuthUserState] = useState(() => {

        return getSecureItem("user");

    });


    const setAuthUser = (user) => {

        if (user) {

            setSecureItem("user", user);

        } else {

            removeSecureItem("user");

        }

        setAuthUserState(user);

    };


    return (

        <AuthContext.Provider
            value={{
                authUser,
                setAuthUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}


export const useAuth = () => {

    return useContext(AuthContext);

};