"use client";
import React, { useEffect, useState } from 'react';
import { defaultPetParameter, PetParameter, useParameter } from '@context/ParameterContext';
import PentagonChart from './pentagon';

const Parameter = () => {
    const { petParameter, setPetParameter} = useParameter();
    const [prevPetParameter, setPrevPetParameter] = useState<PetParameter>(defaultPetParameter);
    
    const [braveChange, setBraveChange] = useState<number>(0);
    const [perseveranceChange, setPerseveranceChange] = useState<number>(0);
    const [coolChange, setCoolChange] = useState<number>(0);
    const [dexterityChange, setDexterityChange] = useState<number>(0);
    const [dedicationChange, setDedicationChange] = useState<number>(0);

    const parameters = [petParameter.brave,petParameter.perseverance,petParameter.cool,petParameter.dexterity,petParameter.dedication]
    const changes = [braveChange, perseveranceChange, coolChange, dexterityChange, dedicationChange];

    useEffect(() => {
        setBraveChange(petParameter.brave - prevPetParameter.brave);
        setPerseveranceChange(petParameter.perseverance - prevPetParameter.perseverance);
        setCoolChange(petParameter.cool - prevPetParameter.cool);
        setDexterityChange(petParameter.dexterity - prevPetParameter.dexterity);
        setDedicationChange(petParameter.dedication - prevPetParameter.dedication);
    
        const timer = window.setTimeout(() => {
            setBraveChange(0);
            setPerseveranceChange(0);
            setCoolChange(0);
            setDexterityChange(0);
            setDedicationChange(0);
            setPrevPetParameter(petParameter);
        }, 1500);
        
        return () => window.clearTimeout(timer);  
    },[petParameter]);
  
    return (
    <>
        <div className = 'home__parameter'>
            <PentagonChart parameters = {parameters} changes = {changes}/>
        </div>
        <div className = 'home__actionpoint'>
            <div className = 'actionpoint__title'>還剩</div>
            <div className = 'actionpoint__point'>{petParameter.round}回合</div>
            {/* <div className = 'actionpoint__bg'></div>     */}
        </div>
    </>
    );
}

export default Parameter;