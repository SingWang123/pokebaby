"use client";
import React, { useState,useEffect } from 'react';
import { useParameter } from '@context/ParameterContext';
import animations from './animation';
import { useAuthContext } from '@context/AuthContext';
import { writePetEnding, writePetParameter } from 'lib/WriteData';
import { findBestMatch } from 'utils/findBestMatch';
import petData from 'public/items/pet.json';
import { findPetNameById } from 'utils/findPetName';


interface EndingProps {
    petname: string;
}


export const Ending: React.FC<EndingProps> = ({ petname }) => { 
    const { petParameter, setPetParameter } = useParameter();  
    const {user} = useAuthContext();
    const AnimationComponent = animations[`Animation${petParameter.petid}`]

    useEffect(() => {
        if (petParameter.round === 0){
            const bestMatchId = findBestMatch(petParameter, petData);

            if(bestMatchId){
                setPetParameter({
                    petid: bestMatchId,
                    round: petParameter.round,
                    brave : petParameter.brave,
                    perseverance : petParameter.perseverance,
                    cool : petParameter.cool,
                    dexterity : petParameter.dexterity,
                    dedication : petParameter.dedication,
                })
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

        writePetEnding(
            petname,
            petParameter.petid,
            petParameter.brave,
            petParameter.perseverance,
            petParameter.cool,
            petParameter.dexterity,
            petParameter.dedication,
            user?.uid 
        )

        writePetParameter(
            randomInitialID,10, 0, 0, 0, 0, 0, user?.uid
        )

        setPetParameter({
            petid: randomInitialID,
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
            <div className = "ending__petname">{petname}</div>
            <div className = "ending__petparameter">        
                勇敢：{petParameter.brave}　
                堅毅：{petParameter.perseverance}　
                冷靜：{petParameter.cool}　
                靈巧：{petParameter.dexterity}　
                奉獻：{petParameter.dedication}　
            </div>
            <div className = 'ending__petavatar'>
                <AnimationComponent /> : 
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
