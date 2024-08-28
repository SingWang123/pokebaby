"use client";
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '@context/AuthContext';
import petData from 'public/items/pet.json';
import animations from 'component/animation';
import { getPetEndingByID } from 'lib/LoadData';
import { findPetNameById, findPetRequirementById } from 'utils/findPetName';

interface EndingRecordById {
    petname: string;
    petid: string;
    brave: number;
    perseverance: number;
    cool: number;
    dexterity: number;
    dedication: number;
} 

interface CollectionDetailProps {
    petid: string;
    setSelectedPetId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CollectionDetail({ petid, setSelectedPetId }: CollectionDetailProps) {
    const { user } = useAuthContext();

    const [endingRecordById, setEndingRecordById] = useState<EndingRecordById[]>([]);
    const AnimationComponent = animations[`Animation${petid}`]
    const PetName = findPetNameById(petData, petid);
    const PetRequirement = findPetRequirementById(petData, petid);
    
    console.log(PetRequirement);

    useEffect(() => {
        if (user?.uid && petid) {
            getPetEndingByID(user.uid, petid, (data) => {
                if (data) { 
                    const updatedEndingRecordById: EndingRecordById[] = data.map((item: any) => ({
                        petname: item.petname,
                        petid: item.petid,
                        brave: item.brave,
                        perseverance: item.perseverance,
                        cool: item.cool,
                        dexterity: item.dexterity,
                        dedication: item.dedication,
                    }));
                    setEndingRecordById(updatedEndingRecordById);
                }
            });
        }
    }, [user, petid]);


    return (
        <div>
            <div className = "detail__background">
                <div className = "collection__detail">
                    <div 
                        className = "detail__closebutton"
                        onClick={() => setSelectedPetId(null)}
                    >
                    </div>
                    <div className = 'detail__petavatar'>
                        <AnimationComponent />  
                    </div>
                    <div className = 'detail__title'>{PetName}</div>
                    <div className = 'detail__scrollbar'>
                        <div className = 'detail__ending_petname'>達成條件：</div>
                        {PetRequirement ? (
                            <>
                                {'type' in PetRequirement ? (
                                    <div className='detail__ending_parameter'>
                                        幼年期型態：{(PetRequirement as unknown as { type: string }).type}
                                    </div>
                                ) : null}
                                <div className='detail__ending_parameter'>
                                    勇敢：{PetRequirement.勇敢}、
                                    堅毅：{PetRequirement.堅毅}、
                                    冷靜：{PetRequirement.冷靜}、
                                    靈巧：{PetRequirement.靈巧}、
                                    奉獻：{PetRequirement.奉獻}
                                </div>
                                <div className="collection__requirement_line"></div>
                            </>
                        ) : null}
                    {endingRecordById.map((record, index) => (
                        <div key={index}  className = 'detail__list'>
                            <div className = 'detail__ending_petname'>{record.petname}</div>
                            <div className = 'detail__list_parameter'>
                                <p className = 'detail__ending_parameter'>勇敢: {record.brave}</p>
                                <p className = 'detail__ending_parameter'>堅毅: {record.perseverance}</p>
                                <p className = 'detail__ending_parameter'>冷靜: {record.cool}</p>
                                <p className = 'detail__ending_parameter'>靈巧: {record.dexterity}</p>
                                <p className = 'detail__ending_parameter'>奉獻: {record.dedication}</p>
                            </div>
                            <div className="collection__line"></div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}