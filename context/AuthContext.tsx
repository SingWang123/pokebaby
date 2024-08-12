import React, { Children, ReactNode, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useAuth } from "lib/firebase";
import { User } from "firebase/auth";

interface AuthContextType {
    user : User | null ;
}

//創建一個Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// //設定provider
// export const AuthProvider = ({ children }: {children: ReactNode}) => {
//     const [user, setUser] = useState<User | null>(null);

//     useEffect(() => {
//         const unsubscribe = 

//     })

// }