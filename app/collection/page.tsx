    "use client";
    import React, { useRef, useState } from 'react';
    import "/styles/collection.css" ;
    import { useEffect } from 'react';
    import { useAuthContext } from '@context/AuthContext';
    import { useRouter } from 'next/navigation';
    import petData from 'public/items/pet.json';
    import Link from 'next/link';
    import animations from 'component/animation';
    import { getPetEndings } from 'lib/LoadData';
    import CollectionDetail from 'component/collection_detail';

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
        const audioRef = useRef<HTMLAudioElement | null>(null);
        const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

        // 分頁狀態
        const [currentPage, setCurrentPage] = useState(0);
        const [itemsPerPage, setItemsPerPage] = useState(8);

        const allPets = Object.values(petData).flatMap(pets => pets);
        const [endingRecord, setEndingRecord] = useState<EndingRecord[]>([]);

        // 動態設定每頁顯示的筆數
        useEffect(() => {
            const updateItemsPerPage = () => {
                const width = window.innerWidth;
                if (width > 1000) {
                    setItemsPerPage(8);
                } else if (width > 735) {
                    setItemsPerPage(6);
                } else {
                    setItemsPerPage(4);
                }
            };

            updateItemsPerPage(); // 初始化時執行一次
            window.addEventListener('resize', updateItemsPerPage); // 監聽螢幕尺寸變化

            return () => {
                window.removeEventListener('resize', updateItemsPerPage); // 清理事件監聽
            };
        }, []);

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
                if (audioRef.current) {
                    audioRef.current.volume = 0.3;
                    audioRef.current.play(); // 播放音樂
                } 
            }
        }, [user, router]);

        // 分頁控制
        const goToNextPage = () => {
            setCurrentPage(prevPage => (prevPage < totalPages - 1 ? prevPage + 1 : prevPage));
        };

        const goToPreviousPage = () => {
            setCurrentPage(prevPage => (prevPage > 0 ? prevPage - 1 : prevPage));
        };


        // 計算完成率
        // 去除重複的 petid
        const uniqueCompletedPets = Array.from(new Set(endingRecord.map(record => record.petid)));

        // 計算去重後的完成數量
        const completedCount = uniqueCompletedPets.length;
        const totalCount = allPets.length;
        const completionRate = ((completedCount / totalCount) * 100).toFixed(2);


        return (
            <div className="home">
                <audio
                    ref={audioRef}
                    src="/audio/Pond.mp3" // 替換為音樂文件的實際路徑
                    loop // 使音樂循環播放
                    autoPlay // 自動播放
                    controls={false} // 隱藏音樂控件
                    style={{ display: 'none' }} // 隱藏 <audio> 元素
                />
                <div className = 'collection__completion_container'>
                    <Link href="/main" style={{ textDecoration: 'none' }}>
                        <img
                            src='/button_back.png'
                            className = 'collection__backbutton'
                        />
                    </Link>
                    <div className = "collection__completion_word">
                        圖鑑完成率：{completionRate}％
                    </div>
                </div>
                <div className='collection'>
                    {paginatedPets.map((record, index) => {
                        const AnimationComponent = animations[`Animation${record.id}`];
                        const endingrecord = endingRecord.find(ending => ending.petid === record.id);
                        
                        return (
                            <div key={index} className='collection__background'>
                                {endingrecord ? (
                                    <div onClick={() => setSelectedPetId(record.id)}>
                                        <div className = 'collection__petavatar'>
                                            {AnimationComponent && <AnimationComponent />}
                                        </div>
                                        <div className = 'collection__title_word'>{record.petname}</div>
                                        <div className = 'collection__description'>{record.description}</div>
                                    </div>
                                ) : (
                                    <>
                                        <div className = 'collection__incomplete'>？</div>
                                        <div className = 'collection__title_word'>需求條件</div>
                                        { 'type' in record.requirement ? 
                                            <div className = 'collection__description'> 
                                            幼年期型態: {(record.requirement as { type: string }).type}
                                            </div>: null
                                        }
                                        <div className = 'collection__description'>
                                            勇敢: {record.requirement.勇敢}、
                                            堅毅: {record.requirement.堅毅}、
                                            冷靜: {record.requirement.冷靜}、
                                            靈巧: {record.requirement.靈巧}、
                                            奉獻: {record.requirement.奉獻}。
                                        </div>
                                    </>
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

                {/* 根據 selectedPetId 顯示寵物的詳細資料 */}
                {selectedPetId && <CollectionDetail petid = {selectedPetId} setSelectedPetId = {setSelectedPetId} />}
            </div>
        );
    }