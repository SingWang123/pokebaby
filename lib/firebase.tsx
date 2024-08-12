import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc, query, onSnapshot } from 'firebase/firestore';
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

//將寵物數據，寫入資料庫
const db = getFirestore(app);

export async function writePetParameter(
    round : number, 
    brave : number, 
    perseverance : number,
    cool : number,
    dexterity : number,
    dedication : number, 
    uid : string | null | undefined 
) {
    if (!uid) {
        console.error('UID is missing');
        return; // 或者拋出錯誤
    }

    try {
        // 引用collection
        const collectionRef = collection(db, uid);
        
        // 引用doc 檔案
        const docRef = doc(collectionRef, "PetParameter");
        
        // 設定檔案資料
        await setDoc(docRef, {
            round: round,
            brave: brave,
            perseverance: perseverance,
            cool: cool,
            dexterity: dexterity,
            dedication: dedication,
        });

        console.log('Document successfully written!');
    } catch (error: any) {
        console.error('Error writing document: ', error);
    }
  }


//讀取資料庫資料
export const getPetParameter = (uid : string | null | undefined, callback: (data: any) => void) =>{
    if (!uid) {
        console.error("Invalid UID");
        return; // 或者拋出錯誤
    }
    
    const collectionRef = collection(db, uid);
    const q = query(collectionRef);
    
    //監聽數據即時更新
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        callback(data);
        console.log(data);
    }, (error) => {
        console.error("Error getting documents: ", error);
    });

    // 返回一个函数用于停止监听
    return unsubscribe;
}

// export async function writeUserData(type : string, money : number, reason : string, uid : string | null | undefined) {
//     const db = getDatabase();
//     const userRef = ref(db, '/' + uid + '/accountingData');
    
//     //取得目前資料庫的資料
//     const snapshot = await get(userRef);
//     const currentData = snapshot.val() || [];

//     // 更新 data
//     const newRecord = {
//         type: type,
//         money: Number(money),
//         reason: reason
//     };
//     const updatedData = [...currentData, newRecord];

//     await set(userRef, updatedData);
//   }

// //刪除資料

// export async function removeUserData(uid: string | null | undefined, indexToRemove: number | null) {
//     const userRef = ref(db, '/' + uid + '/accountingData');
    
//     // 获取当前数据
//     const snapshot = await get(userRef);
//     const currentData = snapshot.val() || [];

//     // 删除指定索引的数据
//     const updatedData = currentData.filter((_: any, i: number) => i !== indexToRemove);

//     // 更新数据到数据库
//     await set(userRef, updatedData);
// }


// //讀取資料庫資料
// export const showAccountingData = (uid : string | null | undefined, callback: (data: any) => void) =>{
//     const accountingDataRef = ref(db, '/' + uid + '/accountingData');
//     onValue(accountingDataRef, (snapshot) => {
//     const data = snapshot.val();
//     callback(data);
//     });
// }