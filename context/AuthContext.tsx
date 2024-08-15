import React, { PropsWithChildren} from "react";
import { createContext, useContext } from "react";
import { useAuth } from "lib/FirebaseAuth";
import { User } from "firebase/auth";

interface AuthContextType {
    user : User | null ;
}

//創建一個Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//設定provider
export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const { user } = useAuth();

    return (
        <AuthContext.Provider value = {{user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error ("useAuthContext錯誤")
    }
    return context;
}