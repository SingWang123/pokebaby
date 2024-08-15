import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';

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
