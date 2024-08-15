"use client";
import { getBackpackItems } from "lib/LoadData";
import { useState } from "react";
import foodData from "public/items/food.json";
import { useAuthContext } from "@context/AuthContext";

export const Backpack = () => {
    const {user} = useAuthContext();
    const [showBackpack, setShowBackpack] = useState(false);
    const [backpackArray, setBackpackArray] = useState<BackpackItem[]>([]);

    interface BackpackItem {
        icon: string;
        count: number;
        effect : {[key:string]: number};
    }

    const findBackpackItems = () => {
        if (user) {
            getBackpackItems(user?.uid, (data) => {
                if (data) {
                    // 將撈出來的 食物資料存成一個array
                    const backpackitmes = Object.keys(data)
                        .filter(key => !isNaN(Number(key)))
                        .map(key => data[key]);
                    
                    // 用新的array 對照 json檔案的資料，整理成背包顯示需要的資料
                    const updateBackpackArray = backpackitmes.map (item => {
                        const matchedID = foodData.find(jsonItem => jsonItem.id === item.foodid);

                        if (matchedID){
                            const backpackItemEffect = Object.fromEntries(
                                Object.entries(matchedID.effect).filter(([key,value]) => value > 0) 
                            )

                            return {
                                icon: matchedID.icon,
                                count: item.count,
                                effect: backpackItemEffect
                            };
                        };
                        return null;
                    }).filter(item => item !== null);

                    setBackpackArray(updateBackpackArray)
                }
            });
        }
    };


    const toggleShowBackpack = () => {
        setShowBackpack((preState) => !preState);
        findBackpackItems();
    }

    return (
        <>
            { showBackpack ? (
                <>  
                    <div className = "backpack__background">
                        <div className = "button__backpack">
                            <img 
                                src = '/icon_backpack.png' 
                                style = {{width:"150px", height : "150px"}}
                                onClick = {toggleShowBackpack}
                            />
                        </div>
                        <div className = "backpack">
                            <div 
                                className = "backpack__closebutton"
                                onClick = {toggleShowBackpack}
                            >
                            </div>
                            {backpackArray.map((record, index) => (
                                <div key = {index} className = "backpack__list">
                                    <img 
                                        src = {backpackArray[index].icon}
                                        className = "backpack__icon" 
                                    />
                                    <div className = "backpack__word">
                                        數量：{backpackArray[index].count}
                                    </div>
                                    <div className = "backpack__word">
                                        {Object.entries(record.effect).map(([key, value]) => (
                                            value > 0 && <div key={key}>{key}＋{value}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </>
            ):(
                    <div className = "button__backpack">
                        <img 
                            src = '/icon_backpack.png' 
                            style = {{width:"150px", height : "150px"}}
                            onClick = {toggleShowBackpack}
                        />
                    </div>
            )}
        </>   
    );
}