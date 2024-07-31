"use client";
import React, { useContext } from 'react';
import { PetParameter, useParameter } from '@context/ParameterContext';

const { petParameter, setPetParameter } = useParameter();

export const handleFeeding = (petParameter : PetParameter, setPetParameter : React.Dispatch<React.SetStateAction<PetParameter>>) => {
    
    function getRandomParameter() {
        const attributes = ['brave', 'perseverance', 'cool', 'dexterity', 'dedication'];
        const randomIndex = Math.floor(Math.random() * attributes.length);

        // 返回隨機選擇的屬性
        return attributes[randomIndex];
    }

    function getRandomInt(min : number, max : number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    let count = getRandomInt(0,6);
    let parameter = getRandomParameter()

    let newPetParameter = {
        brave: petParameter.brave,
        perseverance: petParameter.perseverance,
        cool: petParameter.cool,
        dexterity: petParameter.dexterity,
        dedication: petParameter.dedication,
    }

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

    setPetParameter({
        round: petParameter.round -1,
        brave: newPetParameter.brave,
        perseverance:  newPetParameter.perseverance,
        cool:  newPetParameter.cool,
        dexterity:  newPetParameter.dexterity,
        dedication:  newPetParameter.dedication,
    })
    console.log(parameter,count);
}
