import { useState } from "react"
import foodData from "public/items/food.json";
import { writeBackpack } from "lib/firebase";
import { useAuthContext } from "@context/AuthContext";

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

  // const [foodImg, setFoodImg] = useState(false);

  // console.log(foodData[0]["effect"]["brave"]);

  const handleGetFood = () =>{
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
              break;
          }
      }
      console.log(selectedFood);
      //需檢查 selectedFood 不得為空
      if (selectedFood){
        writeBackpack(
          selectedFood.id,
          1, 
          user?.uid
        );
      } else {
        console.error("沒有得到物品")
      }
      

      // setFoodImg(true);
      // const totalWeight = food.reduce((sum, food) => sum + food.weight, 0);
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

      {selectedFood && (
        <div className = "fade-out">
          <p>取得: {selectedFood.name}</p>
          <img src = {selectedFood.icon} alt = {selectedFood.name} />
        </div>
      )}
    </>
  );
}



