"use client";
import React, { useState, useEffect } from 'react';
import { EggAnimation, BraveAAnimation, CoolAAnimation, DedicationAAnimation, DexterityAAnimation, PerseveranceAAnimation } from 'component/animation';
import { PetParameter, useParameter } from '@context/ParameterContext';
import Parameter from 'component/parameter';
import { Ending } from 'component/ending';
import { getPetParameter, writePetParameter } from 'lib/firebase';
import { useAuthContext } from '@context/AuthContext';

export default function HomePage() {
    const {petParameter, setPetParameter } = useParameter();
    const [highestAttribute,setHighestAttribute] = useState<string | null>("");
    const {user} = useAuthContext();

    //從資料庫撈資料，轉換格式存到Context中
    useEffect(() => {
        let unsubscribe: (() => void) | undefined;
    
        if (user) {
            unsubscribe = getPetParameter(user.uid, (data) => {
                if (data.length > 0) {
                    const petDataItem = data[0]; // 只需要第一個資料
                    const updatedPetParameter: PetParameter = {
                        round: petDataItem.round,
                        brave: petDataItem.brave,
                        perseverance: petDataItem.perseverance,
                        cool: petDataItem.cool,
                        dexterity: petDataItem.dexterity,
                        dedication: petDataItem.dedication,
                    };
                    setPetParameter(updatedPetParameter);
                }
            });
        }
    
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user, setPetParameter]);

    useEffect(() => {
        if (petParameter.round === 5){
            // 使用屬性名稱聯合類型
            type Attribute = 'brave' | 'perseverance' | 'cool' | 'dexterity' | 'dedication';

            // 獲取屬性名稱陣列
            const attributes: Attribute[] = ['brave', 'perseverance', 'cool', 'dexterity', 'dedication'];

            const highestAttribute: Attribute = attributes.reduce((a, b) =>
                petParameter[a] > petParameter[b] ? a : b
            );
            
            setHighestAttribute(highestAttribute);
            console.log(highestAttribute);
        }
    }, [petParameter.round]);

    function getRandomParameter() {
        const attributes = ['brave', 'perseverance', 'cool', 'dexterity', 'dedication'];
        const randomIndex = Math.floor(Math.random() * attributes.length);
        // 返回隨機選擇的屬性
        return attributes[randomIndex];
    }

    function getRandomInt(min : number, max : number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const handleFeeding = () => {
        let count = getRandomInt(1,6);
        let parameter = getRandomParameter()

        let newPetParameter = {...petParameter}

        switch (parameter) {
            case 'brave':
                newPetParameter.brave += count;
                break;
            case 'perseverance':
                newPetParameter.perseverance += count;
                break;
            case 'cool':
                newPetParameter.cool += count;
                break;
            case 'dexterity':
                newPetParameter.dexterity += count;
                break;
            case 'dedication':
                newPetParameter.dedication += count;
                break;
            default:
                break;
        }
        //寫入資料庫
        writePetParameter(
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
        })
    }

    return (
    <div className = "home">
        {
            petParameter.round <= 0 ?
            <Ending />:
            petParameter.round <= 5 ? 
            (
                highestAttribute === "brave" ?  <BraveAAnimation /> :
                    highestAttribute === "cool" ?  <CoolAAnimation /> :
                        highestAttribute === "dedication" ?   <DedicationAAnimation /> :
                            highestAttribute === "dexterity" ?   <DexterityAAnimation /> :
                                highestAttribute === "perseverance" ?   <PerseveranceAAnimation />:
                                    <EggAnimation />
            ) :
            <EggAnimation />
        }
        {
            petParameter.round <= 0 ?
            <div></div>:
            <>
                <div className = 'home__petname'>
                    <div className = 'petname__name'>寵物蛋1號</div>
                </div>
                <Parameter />
                {/* <div className = 'home__actionpoint'>
                    <div className = 'actionpoint__title'>還剩</div>
                    <div className = 'actionpoint__point'>{petParameter.round}回合</div>
                    <div className = 'actionpoint__bg'></div>    
                </div> */}
                <div className = 'home__button'>
                    <div className = "button__action">
                        <p 
                            className = "button__word"
                            onClick = {handleFeeding}
                        >
                            互動
                        </p>
                        <hr className = "button__line"></hr>
                    </div>
                    <div className = "button__action">
                        <p 
                            className = "button__word"
                            onClick = {handleFeeding}    
                        >
                            餵食
                        </p>
                        <hr className = "button__line"></hr>
                    </div>
                </div>
            </>
        }
    </div>
    );
}