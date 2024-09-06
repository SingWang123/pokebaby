"use client";
import React, { useEffect, useRef,useState } from 'react';
import { writePetParameter } from 'lib/WriteData';
import { useParameter } from '@context/ParameterContext';
import { useAuthContext } from '@context/AuthContext';
import petData from 'public/items/pet.json';
import animations from '../animation';
import DropArea from './droparea';
import { findBestMatch } from 'utils/findBestMatch';
import { useHandleDropItem } from 'hooks/handleDropItem';
import lottie, { AnimationItem } from 'lottie-web'; // 引入 AnimationItem 類型
import { useMessageContext } from '@context/MessageContext';


export default function PetAvatar() {
    const {petParameter, setPetParameter } = useParameter();
    const {user} = useAuthContext();

    const AnimationComponent = animations[`Animation${petParameter.petid}`]
    const {handleDropItem} = useHandleDropItem();
    const {message, setMessage, counter} = useMessageContext();
    const [showMessage, setShowMessage] = useState<boolean>(false);

    console.log(message,counter,showMessage);

    // 用來播放愛心動畫的容器引用
    const heartAnimContainer = useRef<HTMLDivElement | null>(null);

    // 用來儲存當前播放的動畫實例
    const animationInstance = useRef<AnimationItem | null>(null);

    //點擊寵物，快樂值加1
    const handleClickPet = () => {
        if (petParameter.happy < 101) {
            // 撥放愛心動畫
            if (heartAnimContainer.current) {
                // 銷毀之前的動畫
                if (animationInstance.current) {
                    animationInstance.current.destroy();
                }

                // 播放新的動畫
                animationInstance.current = lottie.loadAnimation({
                    container: heartAnimContainer.current, // 愛心動畫容器
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    path: '/lottie/heart.json', // 愛心動畫的 JSON 路徑
                });
            }

            //寫入資料庫
            writePetParameter(
                petParameter.petname,
                petParameter.petid,
                petParameter.round,
                petParameter.brave,
                petParameter.perseverance,
                petParameter.cool,
                petParameter.dexterity,
                petParameter.dedication,
                petParameter.happy +3,
                petParameter.full,
                user?.uid
            )
            //寫入context
            setPetParameter({
                ...petParameter,
                happy : petParameter.happy +3
            })
        }
    }

    
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
                    petParameter.happy,
                    petParameter.full,
                    user?.uid
                )
                //寫入context
                setPetParameter({
                    ...petParameter,
                    petid: bestMatchId
                })
            }
        }
    }, [petParameter.round]); 
    
    useEffect(() => {
        setShowMessage(true);

        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 2000); // 2 秒後清除錯誤訊息
        return () => clearTimeout(timer);
    }, [counter]);
    
    return (
        <DropArea onDropItem = {handleDropItem}>
            <div 
                className = 'petavatar__position'
                onClick = {handleClickPet}
            >
                {/* 錯誤訊息 */}
                <>
                    { showMessage && <div className="petavatar__errorword">123{message}</div>}
                </> 
                <AnimationComponent /> 
                {/* 愛心動畫的容器 */}
                <div 
                    ref={heartAnimContainer} 
                    className="heart-animation__container"
                ></div>
            </div>
        </DropArea>
    );
}