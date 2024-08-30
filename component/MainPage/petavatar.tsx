"use client";
import React, { useEffect, useState } from 'react';
import { writePetParameter } from 'lib/WriteData';
import { PetParameter, useParameter } from '@context/ParameterContext';
import { useAuthContext } from '@context/AuthContext';
import petData from 'public/items/pet.json';
import animations from '../animation';
import DropArea from './droparea';
import { findBestMatch } from 'utils/findBestMatch';
import { useHandleDropItem } from 'hooks/handleDropItem';

export default function PetAvatar() {
    const {petParameter, setPetParameter } = useParameter();
    const {user} = useAuthContext();

    const AnimationComponent = animations[`Animation${petParameter.petid}`]
    const handleDropItem = useHandleDropItem();

    
    useEffect(() => {
        if (petParameter.round === 5){
            const bestMatchId = findBestMatch(petParameter, petData);

            if (bestMatchId){
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
                    user?.uid
                )
                //寫入context
                setPetParameter({
                    petname: petParameter.petname,
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
    
    return (
        <DropArea onDropItem = {handleDropItem}>
            <div className = 'petavatar__position'>
                <AnimationComponent />  
            </div>
        </DropArea>
    );
}