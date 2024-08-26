"use client";
import React, { useRef, useState} from 'react';
import { useAuthContext } from '@context/AuthContext';
import { useParameter } from '@context/ParameterContext';
import { writePetParameter } from 'lib/WriteData';


export const Training = () => {
    const {user} = useAuthContext();
    const {petParameter, setPetParameter} = useParameter();
    const [showTrainingWindow, setShowTrainingWindow] = useState<boolean>(false);

    function getRandomParameter() {
        const attributes = ['brave', 'perseverance', 'cool', 'dexterity', 'dedication'];
        const randomIndex = Math.floor(Math.random() * attributes.length);
        // 返回隨機選擇的屬性
        return attributes[randomIndex];
    }

    function getRandomInt(min : number, max : number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    

    const toggleShowTrainingWindow = () => {
        setShowTrainingWindow((preState) => !preState);
    }

    const handleTraining = (plusParameter:string, minusParameter:string) => {
        let count_plus = getRandomInt(1,4);
        let count_minus = getRandomInt(0,2);

        let newPetParameter = {...petParameter}

        const updateParameter = (parameter: string, value: number) => {
            switch (parameter) {
                case 'brave':
                    newPetParameter.brave = Math.max(newPetParameter.brave + value, 0);
                    break;
                case 'perseverance':
                    newPetParameter.perseverance = Math.max(newPetParameter.perseverance + value, 0);
                    break;
                case 'cool':
                    newPetParameter.cool = Math.max(newPetParameter.cool + value, 0);
                    break;
                case 'dexterity':
                    newPetParameter.dexterity = Math.max(newPetParameter.dexterity + value, 0);
                    break;
                case 'dedication':
                    newPetParameter.dedication = Math.max(newPetParameter.dedication + value, 0);
                    break;
                default:
                    break;
            }
        };

        // 增加選定的屬性
        updateParameter(plusParameter, count_plus);

        // 減少選定的屬性
        updateParameter(minusParameter, -count_minus);

        //寫入資料庫
        writePetParameter(
            petParameter.petid,
            petParameter.round -1,
            newPetParameter.brave,
            newPetParameter.perseverance,
            newPetParameter.cool,
            newPetParameter.dexterity,
            newPetParameter.dedication,
            user?.uid
        )
        //寫入context
        setPetParameter({
            ...newPetParameter,
            round: petParameter.round -1,
            petid: petParameter.petid
        })
    }

    return (
        <>
            <div className = "button__action">
                <p 
                    className = "button__word"
                    onClick = {toggleShowTrainingWindow}
                >
                    互動
                </p>
                <hr className = "button__line"></hr>
            </div>
            { showTrainingWindow ? (
                <div className = 'training__container'>
                    <div 
                        className = 'training__button' 
                        onClick = {() => handleTraining("brave","cool")}
                    > 勇氣訓練
                    </div>
                    <div> 勇敢↑ 冷靜↓</div>
                    <div 
                        className = 'training__button' 
                        onClick = {() => handleTraining("perseverance","dexterity")}
                    > 韌性訓練
                    </div>
                    <div> 堅韌↑ 靈巧↓</div>
                    <div 
                        className = 'training__button' 
                        onClick = {() => handleTraining("cool","dedication")}
                    > 冷靜訓練
                    </div>
                    <div> 冷靜↑ 奉獻↓</div>
                    <div 
                        className = 'training__button' 
                        onClick = {() => handleTraining("dexterity","brave")}
                    > 速度訓練
                    </div>
                    <div> 靈巧↑ 勇敢↓</div>
                    <div 
                        className = 'training__button' 
                        onClick = {() => handleTraining("dedication","perseverance")}
                    > 犧牲訓練
                    </div>
                    <div> 奉獻↑ 堅韌↓</div>
                </div>
            ): null
            }
        </>
    );
}