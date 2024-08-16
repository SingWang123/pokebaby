import { getBackpackItems } from "lib/LoadData";
import foodData from "public/items/food.json";
import { BackpackItem } from "@context/BackpackContext";
import { useBackpackContext } from "@context/BackpackContext";

export const findBackpackItems = (
    uid: string | undefined, 
    setBackpackArray: (items: BackpackItem[]) => void
) => {
    if (uid) {
        getBackpackItems(uid, (data) => {
            if (data) {
                const backpackItems = Object.keys(data)
                    .filter(key => !isNaN(Number(key)))
                    .map(key => data[key]);

                const updatedBackpackArray = backpackItems.map(item => {
                    const matchedID = foodData.find(jsonitem => jsonitem.id === item.foodid);

                    if (matchedID) {
                        const backpackItemEffect = Object.fromEntries(
                            Object.entries(matchedID.effect).filter(([key, value]) => value > 0)
                        );

                        return {
                            icon: matchedID.icon,
                            count: item.count,
                            effect: backpackItemEffect
                        };
                    }
                    return null;
                }).filter(item => item !== null) as BackpackItem[];

                setBackpackArray(updatedBackpackArray);
            }
        });
    }
};