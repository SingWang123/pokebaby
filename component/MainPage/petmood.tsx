"use client";
import React, { useEffect, useState } from 'react';
import { useParameter } from '@context/ParameterContext';
import { writePetParameter } from 'lib/WriteData';
import { useAuthContext } from '@context/AuthContext';

const PetMood = () => {
    const {user} = useAuthContext();
    const { petParameter, setPetParameter} = useParameter();
    
    useEffect(() => {
        // 設置每1分鐘減少飽食度1點
        const intervalId = setInterval(() => {
            // 確保飽食度不會降到小於0
            if (petParameter.full > 0) {
                const newPetParameter = {
                    ...petParameter,
                    full: petParameter.full - 1
                };

                // 更新 state
                setPetParameter(newPetParameter);

                // 更新資料庫
                writePetParameter(
                    newPetParameter.petname,
                    newPetParameter.petid,
                    newPetParameter.round,
                    newPetParameter.brave,
                    newPetParameter.perseverance,
                    newPetParameter.cool,
                    newPetParameter.dexterity,
                    newPetParameter.dedication,
                    newPetParameter.happy,
                    newPetParameter.full,
                    user?.uid
                );
            }
        }, 60000); // 60000毫秒 = 1分鐘

        // 清理定時器
        return () => clearInterval(intervalId);
    }, [petParameter, setPetParameter, user?.uid]);
   
    return (
        <>
            <div className = 'home__mood'>
                <div className = 'mood__happy'>
                    快樂值：{petParameter.happy}
                </div>
                <div className = 'mood__full'>
                    飽食度：{petParameter.full}
                </div>
            </div>
        </>
    );
}

export default PetMood;