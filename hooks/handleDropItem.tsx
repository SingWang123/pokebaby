"use client";
import { writeBackpack, writePetParameter } from 'lib/WriteData';
import { useParameter } from '@context/ParameterContext';
import { useAuthContext } from '@context/AuthContext';
import { BackpackItem, useBackpackContext } from '@context/BackpackContext';
import { useCallback } from 'react';
import { PetParameter } from '@context/ParameterContext';

export const useHandleDropItem = () => {
    const { user } = useAuthContext();
    const { petParameter, setPetParameter } = useParameter();
    const { backpackArray, setBackpackArray } = useBackpackContext();

    const handleDropItem = useCallback((item: BackpackItem) => {
        if (item.count <= 0) {
            return; // 如果物品數量不夠，則返回不做任何操作
        }

        const updatedItems = backpackArray.map(i =>
            i.id === item.id && i.count > 0
                ? { ...i, count: i.count - 1 }
                : i
        );
        setBackpackArray(updatedItems);
        // 寫入背包資料庫
        writeBackpack(item.id, -1, user?.uid);

        const newPetParameter: PetParameter = {
            petid: petParameter.petid,
            round: petParameter.round - 1,
            brave: petParameter.brave + (item.effect['勇敢'] || 0),
            perseverance: petParameter.perseverance + (item.effect['堅毅'] || 0),
            cool: petParameter.cool + (item.effect['冷靜'] || 0),
            dexterity: petParameter.dexterity + (item.effect['靈巧'] || 0),
            dedication: petParameter.dedication + (item.effect['奉獻'] || 0),
        };
        setPetParameter(newPetParameter);

        // 寫入資料庫
        writePetParameter(
            newPetParameter.petid,
            petParameter.round - 1,
            newPetParameter.brave,
            newPetParameter.perseverance,
            newPetParameter.cool,
            newPetParameter.dexterity,
            newPetParameter.dedication,
            user?.uid
        );
    }, [backpackArray, petParameter, setBackpackArray, setPetParameter, user?.uid]);

    return handleDropItem;
};