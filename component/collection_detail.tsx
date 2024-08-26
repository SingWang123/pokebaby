"use client";
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '@context/AuthContext';
import petData from 'public/items/pet.json';
import animations from 'component/animation';
import { getPetEndingByID } from 'lib/LoadData';

interface EndingRecordById {
    petname: string;
    petid: string;
    brave: number;
    perseverance: number;
    cool: number;
    dexterity: number;
    dedication: number;
} 

export default function CollectionDetail({ petid }: { petid: string }) {
    const { user } = useAuthContext();

    const [endingRecordById, setEndingRecordById] = useState<EndingRecordById[]>([]);

    console.log(petid);

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
                    console.log(data);
                    console.log(endingRecordById);
                }
            });
        }
    }, [user, petid]);


    return (
        <div>
            <div className = "backpack__background">
                {endingRecordById.map((record, index) => (
                    <div key={index}>
                        <h3>{record.petname}</h3>
                        <p>勇敢: {record.brave}</p>
                        <p>堅毅: {record.perseverance}</p>
                        <p>冷靜: {record.cool}</p>
                        <p>靈巧: {record.dexterity}</p>
                        <p>奉獻: {record.dedication}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}