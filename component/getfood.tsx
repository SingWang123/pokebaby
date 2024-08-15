import { useEffect, useState } from "react"
import foodData from "public/items/food.json";
import { writeBackpack, writeCooldownTime } from "lib/firebase";
import { useAuthContext } from "@context/AuthContext";
import { setInterval } from "timers/promises";

interface FoodEffect {
    brave: number;
    perseverance: number;
    cool: number;
    dexterity: number;
    dedication: number;
}

interface Food {
    id: number;
    icon: string;
    name: string;
    weight: number;
    effect: FoodEffect;
}


export const GetRandomFood = () => {
  const {user} = useAuthContext();
  const [food, setfood] = useState<Food[]>(foodData);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isCoolingDown, setIsCoolingDown] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(60);

  useEffect(() => {
    let timer: number | null = null; // 使用 number | null 類型

    if (isCoolingDown) {
      timer = window.setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            setIsCoolingDown(false);
            writeCooldownTime(false, 0, new Date, user?.uid)
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer !== null) {
        window.clearInterval(timer);
      }
    };
  }, [isCoolingDown]);

  useEffect(() => {
    // 這裡可以處理冷卻時間和寫入資料庫
    if (isCoolingDown && cooldownTime > 0 && user) {
        writeCooldownTime(true, cooldownTime, new Date(), user.uid);
    }
}, [isCoolingDown, user]);



  const handleGetFood = () =>{
    if (!isCoolingDown){
      let totalWeight:number = 0;
      for (let i=0; i < foodData.length; i++){
          totalWeight =  totalWeight+= foodData[i]["weight"];
      }

      //生成1~totalWeight 之間的隨機數
      let random = Math.random() * totalWeight;
      
      //按權重選取物件
      for (const food of foodData) {
          random -= food.weight;
          if (random < 0) {
              setSelectedFood(food);
              console.log("已選擇食物:", food); // 應該能顯示正確的食物

              if(user){
                writeBackpack(food.id, 1, user?.uid)
              }

              //設定冷卻時間
              setIsCoolingDown(true);
              setCooldownTime(60);

              //將冷卻時間寫入資料庫
              // writeCooldownTime(true, cooldownTime, new Date, user?.uid)

              break;
          }
      }
    }
  }

  return (
    <>
      <div className="button__action" style={{ margin: "80px 0px" }}>
        <p 
          className="button__word"
          onClick={handleGetFood}    
        >
          領取食物
        </p>
        <hr className="button__line"></hr>
      </div>
      {isCoolingDown ? 
        <p>冷卻中 {cooldownTime}s </p>:
        <></>
      }

      {selectedFood && (
        <div className = "fade-out">
          <p>取得: {selectedFood.name}</p>
          <img src = {selectedFood.icon} alt = {selectedFood.name} />
        </div>
      )}
    </>
  );
}



