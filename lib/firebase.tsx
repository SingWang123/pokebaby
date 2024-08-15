import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, initializeFirestore, setDoc, query, onSnapshot, getDoc, updateDoc, FieldValue } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { useState ,useEffect } from "react";
import { User } from "firebase/auth";
import { PetParameter } from "@context/ParameterContext";

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
    if (!uid || typeof uid !== 'string') {
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
            round: round || 0,
            brave: brave || 0,
            perseverance: perseverance || 0,
            cool: cool || 0,
            dexterity: dexterity || 0,
            dedication: dedication || 0,
        });
        console.log('寫入寵物數據成功');
    } catch (error: any) {
        console.error('Error writing document: ', error);
    }
}

interface BackpackItem{
    foodid : number;
    count : number;
}

interface BackpackData{
    [key: number]: BackpackItem;
}


//將得到的道具寫進去背包資料庫
export async function writeBackpack(
    foodid : number, 
    count : number, 
    uid : string | null | undefined 
) {
    if (!uid || typeof uid !== 'string') {
        console.error('UID is missing');
        return; // 或者拋出錯誤
    }

    try {
        // 引用collection
        const collectionRef = collection(db, uid);
        
        // 引用doc 檔案
        const docRef = doc(collectionRef, "Backpack");

        //取得目前背包資料
        const docSnap = await getDoc(docRef);

        let backpackData:BackpackData = {};

        //若背包內有東西，讓backpackData等於目前資料庫資料
        if (docSnap.exists()){
            backpackData = docSnap.data() as BackpackData;
        }

        //檢查ID是否存在，存在就加數字，不存在就新增道具
        if (backpackData[foodid]){
            backpackData[foodid].count += count;
        } else {
            backpackData[foodid] = {foodid: foodid, count: count};
        }
        
        // 設定檔案資料
        await setDoc(docRef, backpackData);

        console.log('寫入背包數據成功');
    } catch (error: any) {
        console.error('Error writing document: ', error);
    }
}

// interface CooldownTimeType{
//     isCoolingdown: boolean,
//     cooldownTime: number,
//     lastUpdateTime: Date, 
// }


//將得到的道具寫進去背包資料庫
export async function writeCooldownTime(
    isCoolingdown: boolean,
    cooldownTime: number,
    lastUpdateTime: Date, 
    uid : string | null | undefined 
) {
    if (!uid || typeof uid !== 'string') {
        console.error('UID is missing');
        return; // 或者拋出錯誤
    }

    try {
        // 引用collection
        const collectionRef = collection(db, uid);
        
        // 引用doc 檔案
        const docRef = doc(collectionRef, "CooldownTime");
        
        // 設定檔案資料
        await setDoc(docRef, {
            isCoolingdown: isCoolingdown || false,
            cooldownTime: cooldownTime || 0,
            lastUpdateTime: lastUpdateTime, 
        });

        console.log('寫入冷卻時間成功');
    } catch (error: any) {
        console.error('Error writing document: ', error);
    }
}



//讀取資料庫資料
export const getPetParameter = async (uid : string | null | undefined, callback: (data: any) => void) =>{
    if (!uid) {
        console.error("Invalid UID");
        return; // 或者拋出錯誤
    }
    
    const docRef = doc(db, uid, "PetParameter"); //指定文檔路徑
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            const data = {id:docSnap.id,...docSnap.data()};
            callback(data);
            console.log(data);
        } else {
            console.error("No such document!");
            callback(null);
        }
    } catch (error) {
        console.error("Error getting document:", error);
        callback(null);
    }
}

//     const collectionRef = collection(db, uid);
//     const q = query(collectionRef);
    
//     //監聽數據即時更新
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const data: any[] = [];
//         querySnapshot.forEach((doc) => {
//             data.push({ id: doc.id, ...doc.data() });
//         });
//         callback(data);
//         console.log(data);
//     }, (error) => {
//         console.error("Error getting documents: ", error);
//     });

//     // 返回一个函数用于停止监听
//     return unsubscribe;
// }

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