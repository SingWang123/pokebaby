import { useEffect, useState } from "react"
import foodData from "public/items/food.json";
import { writeBackpack, writeCooldownTime } from "lib/WriteData";
import { useAuthContext } from "@context/AuthContext";
import { loadCooldownTime } from "lib/LoadData";

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
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isCoolingDown, setIsCoolingDown] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(600);
  const minutes = Math.floor(cooldownTime / 60); // 计算分钟数
  const seconds = cooldownTime % 60; // 计算剩余的秒数

  // 從資料庫撈資料，存到setCooldownTime中（一登入就撈取）
  useEffect(() => {
    if (user) {
        loadCooldownTime(user?.uid, (data) => {
            if (data) {
                if (data.isCoolingdown){
                  const lastUpdateTimestamp = data.lastUpdateTime.seconds +  data.lastUpdateTime.nanoseconds / 1e9 ; 
                  const currentTime = Math.floor(Date.now() / 1000);

                  //計算冷卻結束時間
                  const cooldownEndTime = lastUpdateTimestamp + data.cooldownTime;

                  if (currentTime >= cooldownEndTime) {
                    setIsCoolingDown(false);
                    setCooldownTime(0);
                  } else {
                    const remainingTime = Math.floor(cooldownEndTime - currentTime);
                    setIsCoolingDown(true);
                    setCooldownTime(remainingTime);
                  }
                }
            }
        });
    }
  }, [user]);

  //冷卻時間倒數計時
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
              setCooldownTime(600);

              //將冷卻時間寫入資料庫
              // writeCooldownTime(true, cooldownTime, new Date, user?.uid)

              break;
          }
      }
    }
  }




  return (
    <>
    {isCoolingDown ? (
      <>
        <div className="button__action" style={{ margin: "80px 0px 0px 0px", backgroundColor: "gray" }}>
          <p className="button__word" onClick={handleGetFood}>
            領取食物
          </p>
          <hr className="button__line"></hr>
        </div>
        {minutes === 0 ? 
          (<p>冷卻中 {seconds}秒</p>):
          (<p>冷卻中 {minutes}分 {seconds}秒</p>)
        }
      </>
    ) : (
      // 如果未冷却，显示按钮
      <div className="button__action" style={{ margin: "80px 0px" }}>
        <p className="button__word" onClick={handleGetFood}>
          領取食物
        </p>
        <hr className="button__line"></hr>
      </div>
    )}

      {selectedFood && (
        <div className = "fade-out">
          <p>取得: {selectedFood.name}</p>
          <img src = {selectedFood.icon} alt = {selectedFood.name} />
        </div>
      )}
    </>
  );
}



