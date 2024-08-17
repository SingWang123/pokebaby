"use client";
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '@context/AuthContext';
import { useRouter } from 'next/navigation';
import petData from 'public/items/pet.json';
import Link from 'next/link';
import animations from 'component/animation';
import { getPetEndings } from 'lib/LoadData';

interface EndingRecord {
    petname: string;
    petid: string;
    brave: number;
    perseverance: number;
    cool: number;
    dexterity: number;
    dedication: number;
} 

export default function CollectionPage() {
    const { user } = useAuthContext();
    const router = useRouter();

    // 分頁狀態
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    const allPets = Object.values(petData).flatMap(pets => pets);
    const [endingRecord, setEndingRecord] = useState<EndingRecord[]>([]);

    // 計算分頁的資料
    const totalPages = Math.ceil(allPets.length / itemsPerPage);
    const paginatedPets = allPets.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    
    // 檢查登入狀態，未登入踢回首頁
    useEffect(() => {
        if (!user) {
            router.push('/'); // 如果未登入，重定向到首頁或登入頁面
        } else {
            getPetEndings(user?.uid, (data) => {
                if (data) { 
                    const updatedEndingRecords: EndingRecord[] = data["endings"].map((item: any) => ({
                        petname: item.petname,
                        petid: item.petid,
                        brave: item.brave,
                        perseverance: item.perseverance,
                        cool: item.cool,
                        dexterity: item.dexterity,
                        dedication: item.dedication,
                    }));
                    setEndingRecord(updatedEndingRecords);
                }
            });  
        }
    }, [user, router]);

    // 分頁控制
    const goToNextPage = () => {
        setCurrentPage(prevPage => (prevPage < totalPages - 1 ? prevPage + 1 : prevPage));
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => (prevPage > 0 ? prevPage - 1 : prevPage));
    };

    return (
        <div className="home">
            <Link href="/main" style={{ textDecoration: 'none' }}>
                <img
                    src='/button_back.png'
                    style={{ position: "absolute", top: "10%", left: "10%", width: "125px", height: "50px" }}
                />
            </Link>
            <div className='collection'>
                {paginatedPets.map((record, index) => {
                    const AnimationComponent = animations[`Animation${record.id}`];
                    const endingrecord = endingRecord.find(ending => ending.petid === record.id);
                    
                    return (
                        <div key={index} className='collection__background'>
                            {endingrecord ? (
                            <>
                                <div className = 'collection__petavatar'>
                                    {AnimationComponent && <AnimationComponent />}
                                </div>
                                <div className = 'backpack__word'>{record.petname}</div>
                                <div className = 'collection__description'>{record.description}</div>
                            </>
                            ) : (
                                <div className = 'collection__incomplete'>？</div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="pagination-controls">
                {currentPage > 0 && (
                    <button onClick={goToPreviousPage} className="pagination-button">
                        &lt; 上一頁
                    </button>
                )}
                {currentPage < totalPages - 1 && (
                    <button onClick={goToNextPage} className="pagination-button">
                        下一頁 &gt;
                    </button>
                )}
            </div>
        </div>
    );
}