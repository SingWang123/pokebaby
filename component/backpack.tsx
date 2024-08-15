import { useAuth } from "lib/FirebaseAuth"
import { getBackpackItems } from "lib/LoadData";
import { useEffect, useState } from "react";
import foodData from "public/items/food.json";

export const Backpack = () => {
    const {user} = useAuth();
    const [showBackpack, setShowBackpack] = useState(false);
    const [backpackArray, setBackpackArray] = useState<BackpackItem[]>([]);

    interface BackpackItem {
        icon: string;
        count: number;
        effect : {[key:string]: number};
    }

    useEffect(() => {
        if (user) {
            getBackpackItems(user?.uid, (data) => {
                if (data) {
                    console.log(data);
                    const backpackitmes = Object.keys(data)
                        .filter(key => !isNaN(Number(key)))
                        .map(key => data[key]);
                    
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
      }, [showBackpack]);


    const toggleShowBackpack = () => {
        setShowBackpack((preState) => !preState);
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
                            {backpackArray.map((record, index) => (
                                <div>
                                    <img src = {backpackArray[index].icon} />
                                    <div>
                                        數量：{backpackArray[index].count}
                                    </div>
                                    <div>
                                        {Object.entries(record.effect).map(([key, value]) => (
                                            value > 0 && <div key={key}>{key} ＋{value}</div>
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