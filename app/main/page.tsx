"use client";
import React, { useState, useEffect, useRef } from 'react';
import Parameter from 'component/MainPage/parameter';
import { Ending } from 'component/MainPage/ending';
import { GetFood } from 'component/MainPage/getfood';
import { getPetParameter } from 'lib/LoadData';
import { PetParameter, useParameter } from '@context/ParameterContext';
import { useAuthContext } from '@context/AuthContext';
import { useRouter } from 'next/navigation';
import { Backpack } from 'component/MainPage/backpack';
import { Feeding } from 'component/MainPage/feeding';
import PetAvatar from 'component/MainPage/petavatar';
import Link from 'next/link';
import { Training } from 'component/MainPage/training';
import { PetName } from 'component/MainPage/petname';
import PetMood from 'component/MainPage/petmood';


export default function MainPage() {
    const {petParameter, setPetParameter } = useParameter();
    const {user} = useAuthContext();
    const router = useRouter();

    const audioRef = useRef<HTMLAudioElement | null>(null);

    //檢查登入狀態，未登入踢回首頁
    useEffect(() => {
        if (!user) {
          router.push('/'); // 如果未登入，重定向到首頁或登入頁面
        }
      }, [user, router]);

    // 從資料庫撈資料，存到Context中（一登入就撈取，登入時可以從之前離開的紀錄開始）
    useEffect(() => {
        if (user) {
            getPetParameter(user.uid, (data) => {
                if (data) {
                    const currentTimeInSeconds = Math.floor(Date.now() / 1000); //目前時間，單位秒
                    const lastUpdateTimeInSeconds = data.fullUpdateTime.seconds + data.fullUpdateTime.nanoseconds / 1e9; // 最後的飽食度更新時間，單位秒
                    const timeDifferenceInSeconds = currentTimeInSeconds - lastUpdateTimeInSeconds; // 取得時間差（毫秒）
                    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60 ; // 將時間差轉換為分鐘

                    // 计算每5分钟减少5点飽食度
                    const fullnessReduction = Math.floor(timeDifferenceInMinutes / 5) * 5; 

                    // 计算当前的飽食度
                    const currentFullness = Math.max(data.full - fullnessReduction, 0); // 确保飽食度不低于0

                    const updatedPetParameter: PetParameter = {
                        petname: data.petname,
                        petid: data.petid,
                        round: data.round,
                        brave: data.brave,
                        perseverance: data.perseverance,
                        cool: data.cool,
                        dexterity: data.dexterity,
                        dedication: data.dedication,
                        happy: data.happy,
                        full: currentFullness,
                        fullUpdateTime: new Date()
                    };
                    setPetParameter(updatedPetParameter);
                }
                if (audioRef.current) {
                    audioRef.current.volume = 0.2;
                    audioRef.current.play(); // 播放音樂
                }
            });            
        }
    }, [user, setPetParameter]);

    return (
        <div className = "home">
            <audio
                ref={audioRef}
                src="/audio/Ukulele_Song.mp3" // 替換為音樂文件的實際路徑
                loop // 使音樂循環播放
                autoPlay // 自動播放
                controls={false} // 隱藏音樂控件
                style={{ display: 'none' }} // 隱藏 <audio> 元素
            />
            {
                petParameter.round <= 0 ?
                <Ending />:
                <PetAvatar /> 
            }
            {
                petParameter.round <= 0 ?
                <div></div>:
                <>
                    <PetName />
                    <Parameter />
                    <PetMood />

                    <div className = 'home__button'>
                        <Training />
                        <Feeding />
                        <GetFood />
                    </div>
                    <div className = 'imgbutton'>
                        <div className = "button__collection">
                            <Link href="/collection" style={{ textDecoration: 'none' }}>
                                <img 
                                    src = '/icon_collection.png' 
                                    className = "button__image"
                                />
                            </Link>
                        </div>
                        <Backpack />
                    </div>
                </>
            }
        </div>
    );
}