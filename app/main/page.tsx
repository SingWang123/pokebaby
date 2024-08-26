"use client";
import React, { useState, useEffect } from 'react';
import Parameter from 'component/parameter';
import { Ending } from 'component/ending';
import { GetRandomFood } from 'component/getfood';
import { getPetParameter } from 'lib/LoadData';
import { PetParameter, useParameter } from '@context/ParameterContext';
import { useAuthContext } from '@context/AuthContext';
import { useRouter } from 'next/navigation';
import { Backpack } from 'component/backpack';
import { Feeding } from 'component/feeding';
import PetAvatar from 'component/petavatar';
import petData from 'public/items/pet.json';
import { findPetNameById } from 'utils/findPetName';
import Link from 'next/link';
import { Training } from 'component/training';


export default function MainPage() {
    const {petParameter, setPetParameter } = useParameter();
    const {user} = useAuthContext();
    const router = useRouter();
    const [petName,setPetName] = useState<string>("蛋蛋1號")

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
                        petid: data.petid,
                        round: data.round,
                        brave: data.brave,
                        perseverance: data.perseverance,
                        cool: data.cool,
                        dexterity: data.dexterity,
                        dedication: data.dedication,
                    };
                    setPetParameter(updatedPetParameter);
                }
            });            
        }
    }, [user, setPetParameter]);

    useEffect(() => {
        const findname = findPetNameById(petData, petParameter.petid);
        if (findname){
            setPetName(findname);
        }
    },[petParameter]);

    return (
        <div className = "home">
            {
                petParameter.round <= 0 ?
                <Ending petname = {petName}/>:
                <PetAvatar /> 
            }
            {
                petParameter.round <= 0 ?
                <div></div>:
                <>
                    <div className = 'home__petname'>
                        <div className = 'petname__name'>{petName}</div>
                    </div>
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