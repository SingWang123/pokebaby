"use client";
import React, { useState,useEffect } from 'react';
import { useParameter } from '@context/ParameterContext';
import { EggAnimation, BraveAAnimation, CoolAAnimation, DedicationAAnimation, DexterityAAnimation, PerseveranceAAnimation } from '../component/animation';
import { writePetParameter } from 'lib/WriteData';
import { useAuthContext } from '@context/AuthContext';


export const Ending = () => { 
    const { petParameter, setPetParameter } = useParameter();  
    const [endingHighestAttribute,setEndingHighestAttribute] = useState<string | null>("");
    const {user} = useAuthContext();

    useEffect(() => {
        if (petParameter.round === 0){
            // 使用屬性名稱聯合類型
            type Attribute = 'brave' | 'perseverance' | 'cool' | 'dexterity' | 'dedication';

            // 獲取屬性名稱陣列
            const attributes: Attribute[] = ['brave', 'perseverance', 'cool', 'dexterity', 'dedication'];

            const endingHighestAttribute: Attribute = attributes.reduce((a, b) =>
                petParameter[a] > petParameter[b] ? a : b
            );
            
            setEndingHighestAttribute(endingHighestAttribute);
            console.log(endingHighestAttribute);
        }
    }, [petParameter.round]);

    const handleNewGame = () => {

        writePetParameter(
            10, 0, 0, 0, 0, 0, user?.uid
        )

        setPetParameter({
            round: 10,
            brave: 0,
            perseverance: 0,
            cool: 0,
            dexterity: 0,
            dedication: 0,
            
        })
    }

    return (
        <div className = "home">
            <div className = "ending__title">結局</div>
            {
                endingHighestAttribute === "brave" ?  <BraveAAnimation  /> :
                    endingHighestAttribute === "cool" ?  <CoolAAnimation /> :
                        endingHighestAttribute === "dedication" ?   <DedicationAAnimation /> :
                            endingHighestAttribute === "dexterity" ?   <DexterityAAnimation /> :
                                endingHighestAttribute === "perseverance" ?   <PerseveranceAAnimation />:
                                    <EggAnimation />
            }
            <div className = 'ending__button'>    
                <div className = "button__newgame">
                    <p 
                        className = "button__word"
                        onClick = {handleNewGame}   
                    >
                        重新開始
                    </p>
                    <hr className = "button__line"></hr>
                </div>
            </div>
        </div>
    )

}
