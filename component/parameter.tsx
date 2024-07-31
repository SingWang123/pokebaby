"use client";
import React, { useContext } from 'react';
import { useParameter } from '@context/ParameterContext';

export default function Parameter() {
    const { petParameter, setPetParameter } = useParameter();

    return (
    <>
        <div className = 'home__information'>
            <div className = 'information__stat'>勇敢：{petParameter.brave}</div>
            <div className = 'information__stat'>堅毅：{petParameter.perseverance}</div>
            <div className = 'information__stat'>冷靜：{petParameter.cool}</div>
            <div className = 'information__stat'>靈巧：{petParameter.dexterity}</div>
            <div className = 'information__stat'>奉獻：{petParameter.dedication}</div>
        </div>
        <div className = 'home__actionpoint'>
            {/* <div className = 'actionpoint__title'>還剩</div>
            <div className = 'actionpoint__point'>{petParameter.round}回合</div> */}
            <div className = 'actionpoint__bg'></div>    
        </div>
    </>
    );
}