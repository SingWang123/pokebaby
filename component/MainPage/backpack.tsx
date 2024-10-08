"use client";
import { useState } from "react";
import { useAuthContext } from "@context/AuthContext";
import { findBackpackItems} from "utils/backpackItemUtils";
import { useBackpackContext } from "@context/BackpackContext";

export const Backpack = () => {
    const {user} = useAuthContext();
    const [showBackpack, setShowBackpack] = useState(false);
    const {backpackArray,setBackpackArray} = useBackpackContext(); 

    // 檢查是否至少有一個物品的 count 大於 0
    const hasItems = backpackArray.some(item => item.count > 0);
      
    const toggleShowBackpack = () => {
        setShowBackpack((preState) => !preState);

        if (!showBackpack){
            findBackpackItems(user?.uid,setBackpackArray);
        }
    }

    return (
        <>
            { showBackpack ? (
                <>  
                    <div className = "button__backpack">
                        <img 
                            src = '/icon_backpack.png' 
                            className = "button__image"
                            onClick = {toggleShowBackpack}
                        />
                    </div>
                    <div className = "backpack__background">
                        <div className = "backpack">
                            <div 
                                className = "backpack__closebutton"
                                onClick = {toggleShowBackpack}
                            >
                            </div>
                            {!hasItems ? (
                                <div className = "feedingwindow__noitem">
                                    點選「領取食物」按鈕取得食物
                                </div>
                            ):(
                                backpackArray.map((record, index) => (
                                    backpackArray[index].count <= 0 ? (
                                        null
                                    ) : (
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
                                    )
                                ))
                            )}
                        </div>
                    </div>
                </>
            ):(
                <div className = "button__backpack">
                    <img 
                        src = '/icon_backpack.png' 
                        className = "button__image"
                        onClick = {toggleShowBackpack}
                    />
                </div>
            )}
        </>   
    );
}