import { initializeApp } from "firebase/app";
import { doc, getFirestore, getDoc } from 'firebase/firestore';

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

//設定db
const db = getFirestore(app);

//讀取資料庫寵物數據資料
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
            // console.log(data);
        } else {
            console.error("No such document!");
            callback(null);
        }
    } catch (error) {
        console.error("Error getting document:", error);
        callback(null);
    }
}

//讀取資料庫背包數據資料
export const getBackpackItems = async (uid : string | null | undefined, callback: (data: any) => void) =>{
    if (!uid) {
        console.error("Invalid UID");
        return; // 或者拋出錯誤
    }
    
    const docRef = doc(db, uid, "Backpack"); //指定文檔路徑
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            const data = {id:docSnap.id,...docSnap.data()};
            callback(data);
            // console.log(data);
        } else {
            console.error("No such document!");
            callback(null);
        }
    } catch (error) {
        console.error("Error getting document:", error);
        callback(null);
    }
}

//讀取資料庫冷卻時間數據資料
export const loadCooldownTime = async (uid : string | null | undefined, callback: (data: any) => void) =>{
    if (!uid) {
        console.error("Invalid UID");
        return; // 或者拋出錯誤
    }
    
    const docRef = doc(db, uid, "CooldownTime"); //指定文檔路徑
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            const data = {id:docSnap.id,...docSnap.data()};
            callback(data);
            // console.log(data);
        } else {
            console.error("No such document!");
            callback(null);
        }
    } catch (error) {
        console.error("Error getting document:", error);
        callback(null);
    }
}


//讀取資料庫結局數據資料
export const getPetEndings = async (uid : string | null | undefined, callback: (data: any) => void) =>{
    if (!uid) {
        console.error("Invalid UID");
        return; // 或者拋出錯誤
    }
    
    const docRef = doc(db, uid, "PetEndings"); //指定文檔路徑
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            const data = {id:docSnap.id,...docSnap.data()};
            callback(data);
            // console.log(data);
        } else {
            console.error("No such document!");
            callback(null);
        }
    } catch (error) {
        console.error("Error getting document:", error);
        callback(null);
    }
}


//讀取資料庫結局資料，ID=OOOXX
export const getPetEndingByID = async (uid : string | null | undefined, petid :string, callback: (data: any) => void) =>{
    if (!uid) {
        console.error("Invalid UID");
        return; // 或者拋出錯誤
    }
    
    const docRef = doc(db, uid, "PetEndings"); //指定文檔路徑

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            const data = docSnap.data();
            const endings = data?.endings;

            if (endings && Array.isArray(endings)){
                const matchedEndings = endings.filter((item: any) => item.petid === petid);
                if(matchedEndings.length > 0){
                    callback(matchedEndings);
                    // console.log(matchedEndings);
                } else {
                    console.error ("未找到對應的petid資料")
                    callback(null);
                }
                
            } else {
                console.error ("`endings` 資料不是陣列或不存在！")
                callback(null);
            }
        } else {
            console.error("No such document!");
            callback(null);
        }
    } catch (error) {
        console.error("Error getting document:", error);
        callback(null);
    }
}


//讀取資料庫結局數據資料，結局總數
export const getEndingsCount = async (uid : string | null | undefined, callback: (data: any) => void) =>{
    if (!uid) {
        console.error("Invalid UID");
        return; // 或者拋出錯誤
    }
    
    const docRef = doc(db, uid, "PetEndings"); //指定文檔路徑
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            const data = docSnap.data();
            const endings = data?.endings;
            
            if (endings.length > 0 ){
                callback(endings.length);
                // console.log(endings.length);
            } else {
                callback(0);
            }
        } else {
            console.error("No such document!");
            callback(null);
        }
    } catch (error) {
        console.error("Error getting document:", error);
        callback(null);
    }
}