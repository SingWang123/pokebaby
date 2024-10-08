"use client";
import React, { useState,useEffect } from 'react';
import { useParameter } from '@context/ParameterContext';
import animations from '../animation';
import { useAuthContext } from '@context/AuthContext';
import { writePetEnding, writePetParameter } from 'lib/WriteData';
import { findBestMatch } from 'utils/findBestMatch';
import petData from 'public/items/pet.json';
import { getEndingsCount } from 'lib/LoadData';
import { useMessageContext } from '@context/MessageContext';


export const Ending = () => { 
    const { petParameter, setPetParameter } = useParameter();  
    const {user} = useAuthContext();
    const {message, setMessage} = useMessageContext();

    const AnimationComponent = animations[`Animation${petParameter.petid}`]

    const [endingsCount, setEndingsCount] = useState<number>(0);
    const newPetname = "蛋蛋"+(endingsCount+2)+"號"

    useEffect(() => {
        if (user?.uid) {
            getEndingsCount(user.uid, (data) => {
                if (data) { 
                    setEndingsCount(data);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (petParameter.round === 0){
            const bestMatchId = findBestMatch(petParameter, petData);

            if(bestMatchId){
                setPetParameter({
                    ...petParameter,
                    petid: bestMatchId,
                })
                
                //寫入資料庫
                writePetParameter(
                    petParameter.petname,
                    bestMatchId,
                    petParameter.round,
                    petParameter.brave,
                    petParameter.perseverance,
                    petParameter.cool,
                    petParameter.dexterity,
                    petParameter.dedication,
                    petParameter.happy,
                    petParameter.full,
                    petParameter.fullUpdateTime,
                    user?.uid
                )
            }
        }
    }, [petParameter.round]);

    function getRandomID() {
        const attributes = ['0001', '0002', '0003', '0004', '0005'];
        const randomID = Math.floor(Math.random() * attributes.length);
        // 返回隨機選擇的屬性
        return attributes[randomID];
    }

    const handleNewGame = () => {
        const randomInitialID = getRandomID();
    
        // 查找隨機選擇的寵物
        const selectedPet = petData["蛋蛋期"].find(pet => pet.id === randomInitialID);
        
        // 如果找到該寵物，將其預設參數應用到新遊戲中
        if (selectedPet) {
            const { 勇敢, 堅毅, 冷靜, 靈巧, 奉獻 } = selectedPet.initial;
    
            writePetEnding(
                petParameter.petname,
                petParameter.petid,
                petParameter.brave,
                petParameter.perseverance,
                petParameter.cool,
                petParameter.dexterity,
                petParameter.dedication,
                user?.uid 
            )
    
            writePetParameter(
                newPetname, randomInitialID, 10, 勇敢, 堅毅, 冷靜, 靈巧, 奉獻, 30, 30, new Date(), user?.uid
            )
    
            setPetParameter({
                petname: newPetname,
                petid: randomInitialID,
                round: 10,
                brave: 勇敢,
                perseverance: 堅毅,
                cool: 冷靜,
                dexterity: 靈巧,
                dedication: 奉獻,
                happy: 30,
                full: 30,
                fullUpdateTime: new Date()            
            });

            setMessage("");
            
        } else {
            console.error("未找到對應的寵物");
        }
    }

    return (
        <div className = "home">
            <div className = "ending__title">結局</div>
            <div className = "ending__petname">{petParameter.petname}</div>
            <div className = "ending__petparameter">        
                勇敢：{petParameter.brave}　
                堅毅：{petParameter.perseverance}　
                冷靜：{petParameter.cool}　
                靈巧：{petParameter.dexterity}　
                奉獻：{petParameter.dedication}　
            </div>
            <div className = 'ending__petavatar'>
                <AnimationComponent />
            </div>
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
