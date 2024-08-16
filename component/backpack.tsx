"use client";
import { useState } from "react";
import { useAuthContext } from "@context/AuthContext";
import { findBackpackItems} from "utils/backpackItemUtils";
import { useBackpackContext } from "@context/BackpackContext";

export const Backpack = () => {
    const {user} = useAuthContext();
    const [showBackpack, setShowBackpack] = useState(false);
    const {backpackArray,setBackpackArray} = useBackpackContext();    


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