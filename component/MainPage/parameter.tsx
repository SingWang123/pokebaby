"use client";
import React, { useEffect, useState } from 'react';
import { defaultPetParameter, PetParameter, useParameter } from '@context/ParameterContext';

const Parameter = () => {
    const { petParameter, setPetParameter} = useParameter();
    const [prevPetParameter, setPrevPetParameter] = useState<PetParameter>(defaultPetParameter);
    
    const [braveChange, setBraveChange] = useState<number>(0);
    const [perseveranceChange, setPerseveranceChange] = useState<number>(0);
    const [coolChange, setCoolChange] = useState<number>(0);
    const [dexterityChange, setDexterityChange] = useState<number>(0);
    const [dedicationChange, setDedicationChange] = useState<number>(0);
    
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
        }, 1000);
        
        return () => window.clearTimeout(timer);  
    },[petParameter]);
  
    return (
    <>
        <div className = 'home__information'>
            <div className = 'information__stat'>
                <span>勇敢：{petParameter.brave}</span>
                {braveChange !== 0 && <span className = 'fade-out'>{braveChange > 0 ? `+${braveChange}` : braveChange}</span>}
            </div>
            <div className = 'information__stat'>
                <span >堅毅：{petParameter.perseverance}</span>
                {perseveranceChange !== 0 && <span className = 'fade-out'>{perseveranceChange > 0 ? `+${perseveranceChange}` : perseveranceChange}</span>}
            </div>
            <div className = 'information__stat'>
                <span>冷靜：{petParameter.cool}</span>
                {coolChange !== 0 && <span className = 'fade-out'>{coolChange > 0 ? `+${coolChange}` : coolChange}</span>}
            </div>
            <div className = 'information__stat'>
                <span>靈巧：{petParameter.dexterity}</span>
                {dexterityChange !== 0 && <span className = 'fade-out'>{dexterityChange > 0 ? `+${dexterityChange}` : dexterityChange}</span>}
            </div>
            <div className = 'information__stat'>
                <span>奉獻：{petParameter.dedication}</span>
                {dedicationChange !== 0 && <span className = 'fade-out'>{dedicationChange > 0 ? `+${dedicationChange}` : dedicationChange}</span>}
            </div>
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