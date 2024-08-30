"use client";
import React, { useState, useEffect } from 'react';
import Parameter from 'component/MainPage/parameter';
import { Ending } from 'component/MainPage/ending';
import { GetRandomFood } from 'component/MainPage/getfood';
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


export default function MainPage() {
    const {petParameter, setPetParameter } = useParameter();
    const {user} = useAuthContext();
    const router = useRouter();
    // const [petName,setPetName] = useState<string>("蛋蛋1號")

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
                    const updatedPetParameter: PetParameter = {
                        petname: data.petname,
                        petid: data.petid,
                        round: data.round,
                        brave: data.brave,
                        perseverance: data.perseverance,
                        cool: data.cool,
                        dexterity: data.dexterity,
                        dedication: data.dedication,
                    };
                    setPetParameter(updatedPetParameter);
                    console.log(petParameter);
                }
            });            
        }
    }, [user, setPetParameter]);

    return (
        <div className = "home">
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
                    <div className = "button__collection">
                        <Link href="/collection" style={{ textDecoration: 'none' }}>
                            <img 
                                src = '/icon_collection.png' 
                                style = {{width:"150px", height : "150px"}}
                            />
                        </Link>
                    </div>
                    <div className = 'home__button'>
                        <Training />
                        <Feeding />
                        <GetRandomFood />
                    </div>
                    <Backpack />
                </>
            }
        </div>
    );
}