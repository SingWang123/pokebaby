import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { useState ,useEffect } from "react";
import { User } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
// // 初始化 Firestore 並強制使用 Long Polling
// const firestore = initializeFirestore(app, {
//     experimentalForceLongPolling: true,
//   });

export { app };
export const auth = getAuth();

//調用firebase註冊功能

interface AuthError extends Error {
    code?: string;
    message: string;  // message 需要是 string
  }

export const registerUser = (email: string, password: string) =>{
    return createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            throw new Error(`Error ${error.Code}: ${error.Message}`)
        });

} 


//調用firebase登入功能
export const signinUser = (email: string, password: string) =>{
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            throw new Error(`Error ${error.Code}: ${error.Message}`)
        });
}


//調用firebase 檢查登入狀態功能
export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    },[]);

    return {user,loading};
}


//調用firebase登出功能
export const signinOut = () =>{
    signOut(auth).then(() => {
        alert("登出成功");
      }).catch((error) => {
        alert("登出失敗");
      });
}
