"use client";
import React, { useEffect} from 'react';
import { useParameter } from '@context/ParameterContext';
import { writePetParameter } from 'lib/WriteData';
import { useAuthContext } from '@context/AuthContext';

const PetMood = () => {
    const {user} = useAuthContext();
    const { petParameter, setPetParameter} = useParameter();

    const happyPercentage = (petParameter.happy / 100) * 100;
    const fullPercentage = (petParameter.full / 100) * 100;
    
    useEffect(() => {
        // 設置每5分鐘減少飽食度5點
        const intervalId = setInterval(() => {
            // 確保飽食度不會降到小於0
            if (petParameter.full > 0) {
                const newPetParameter = {
                    ...petParameter,
                    full: Math.max(petParameter.full - 5, 0),
                    fullUpdateTime: new Date()
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
                    newPetParameter.fullUpdateTime,
                    user?.uid
                );
            }
        }, 300000); // 60000毫秒 = 1分鐘

        // 清理定時器
        return () => clearInterval(intervalId);
    }, [petParameter, setPetParameter, user?.uid]);
   
    return (
        <div className = 'home__mood'>
            <div className="mood__progress-bar">
                <span className="mood__progress-bar__label">快樂值</span>
                <div className="mood__progress-bar__outer">
                    <div className="mood__progress-bar__inner" style={{ width: `${happyPercentage}%`, backgroundColor: "#f868bf" }}>
                    {/* <span className="mood__progress-bar__value">{petParameter.happy}</span> */}
                    </div>
                </div>
            </div>
            <div className="mood__progress-bar">
                <span className="mood__progress-bar__label">飽食度</span>
                <div className="mood__progress-bar__outer">
                    <div className="mood__progress-bar__inner" style={{ width: `${fullPercentage}%`, backgroundColor: "#f868bf" }}>
                    {/* <span className="mood__progress-bar__value">{petParameter.full}</span> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetMood;