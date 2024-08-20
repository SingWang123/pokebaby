"use client";
import { PetParameter, useParameter } from '@context/ParameterContext';


export interface PetRequirement {
    勇敢: number;
    堅毅: number;
    冷靜: number;
    靈巧: number;
    奉獻: number;
    type?: string; // 成年期要求中可能有的屬性
}
  
export interface Pet {
    id: string;
    petname: string;
    path: string;
    pettype: string;
    description: string;
    priority: number;
    requirement: PetRequirement;
}
  
export interface PetData {
    蛋蛋期: Pet[];
    幼年期: Pet[];
    成年期: Pet[];
}

export const findBestMatch = (petParameter: PetParameter, petData: PetData): string | null => {
    const { round, petid } = petParameter;

    // 先找出當前寵物的類型
    const currentPet = Object.values(petData).flat().find(pet => pet.id === petid);
    if (!currentPet) return null;

    const currentPetType = currentPet.pettype;
    const validPetIds = ["0001", "0002", "0003", "0004", "0005"];

    if (validPetIds.includes(petParameter.petid)) {
        const candidates = petData.幼年期.filter(pet => {
            const { requirement } = pet;
            return (
                petParameter.brave >= requirement.勇敢 &&
                petParameter.perseverance >= requirement.堅毅 &&
                petParameter.cool >= requirement.冷靜 &&
                petParameter.dexterity >= requirement.靈巧 &&
                petParameter.dedication >= requirement.奉獻
            );
        });

        candidates.sort((a, b) => a.priority - b.priority);
        return candidates.length > 0 ? candidates[0].id : petParameter.petid;

    } else {
        const candidates = petData.成年期.filter(pet => {
            const { requirement } = pet;
            return (
                requirement.type === currentPetType && // 確保類型匹配
                petParameter.brave >= requirement.勇敢 &&
                petParameter.perseverance >= requirement.堅毅 &&
                petParameter.cool >= requirement.冷靜 &&
                petParameter.dexterity >= requirement.靈巧 &&
                petParameter.dedication >= requirement.奉獻
            );
        });

        candidates.sort((a, b) => a.priority - b.priority);
        return candidates.length > 0 ? candidates[0].id : petParameter.petid;
    }
};