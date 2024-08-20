"use client";
import React, { useState, useEffect } from 'react';
import Parameter from 'component/parameter';
import { Ending } from 'component/ending';
import { GetRandomFood } from 'component/getfood';
import { writePetParameter } from 'lib/WriteData';
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

    function getRandomParameter() {
        const attributes = ['brave', 'perseverance', 'cool', 'dexterity', 'dedication'];
        const randomIndex = Math.floor(Math.random() * attributes.length);
        // 返回隨機選擇的屬性
        return attributes[randomIndex];
    }

    function getRandomInt(min : number, max : number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const handleFeeding = () => {
        let count = getRandomInt(1,6);
        let parameter = getRandomParameter()

        let newPetParameter = {...petParameter}

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
        //寫入資料庫
        writePetParameter(
            petParameter.petid,
            petParameter.round -1,
            newPetParameter.brave,
            newPetParameter.perseverance,
            newPetParameter.cool,
            newPetParameter.dexterity,
            newPetParameter.dedication,
            user?.uid
        )
        //寫入context
        setPetParameter({
            ...newPetParameter,
            round: petParameter.round -1,
            petid: petParameter.petid
        })
    }

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
                        <div className = "button__action">
                            <p 
                                className = "button__word"
                                onClick = {handleFeeding}
                            >
                                互動
                            </p>
                            <hr className = "button__line"></hr>
                        </div>
                        <Feeding />
                        <GetRandomFood />
                    </div>
                    <Backpack />
                </>
            }
        </div>
    );
}