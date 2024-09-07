"use client";
import React, { useRef, useState} from 'react';
import { useAuthContext } from '@context/AuthContext';
import { findBackpackItems} from "utils/backpackItemUtils";
import { useBackpackContext } from '@context/BackpackContext';
import DraggableItem from './draggaleitem';



export const Feeding = () => {
    const [showFeedingFoodWindow, setShowFeedingFoodWindow] = useState<boolean>(false);
    const {user} = useAuthContext();
    const {backpackArray,setBackpackArray} = useBackpackContext();

    // 檢查是否至少有一個物品的 count 大於 0
    const hasItems = backpackArray.some(item => item.count > 0);  

    //左右拖拉餵食彈窗
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const toggleShowFeedingFoodWindow = () => {
        setShowFeedingFoodWindow((preState) => !preState);
        
        if (!showFeedingFoodWindow){
            findBackpackItems(user?.uid,setBackpackArray);
        }
    }

    // 共用的拖動邏輯
    const handleDragStart = (xPosition: number) => {
        if (scrollRef.current !== null) {
            setIsDragging(true);
            setStartX(xPosition - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
        }
    };

    const handleDragMove = (xPosition: number) => {
        if (!isDragging || scrollRef.current === null) return;
        const x = xPosition - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 3; // 3 是拖動速度調節係數
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        handleDragStart(e.pageX);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleDragMove(e.pageX);
    };

    // Touch events
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        handleDragStart(e.touches[0].pageX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        handleDragMove(e.touches[0].pageX);
    };

    const scrollLeftHandler = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 300; // 向左滑動的距離
        }
    };
    
    const scrollRightHandler = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 300; // 向右滑動的距離
        }
    };

    return (
        <>
            <div className = "button__action">
                <p 
                    className = "button__word"
                    onClick = {toggleShowFeedingFoodWindow}    
                >
                    餵食
                </p>
                <hr className = "button__line"></hr>
            </div>
            { showFeedingFoodWindow ? 
                <div className = "feedingwindow__container">
                    <div 
                        className = "feedingwindow__closebutton"
                        onClick = {toggleShowFeedingFoodWindow}
                    >
                    </div>
                    <span 
                        className="feedingwindow__triangle-right"
                        onClick={scrollRightHandler}    
                    ></span>
                    <div 
                        className = "feedingwindow"
                        ref = {scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleDragEnd}
                        onMouseUp={handleDragEnd}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleDragEnd}
                    >
                        {!hasItems ? (
                            <div className = "feedingwindow__noitem">
                                點選「領取食物」按鈕取得食物  
                            </div>
                            ): (    
                            <div>                            
                                {backpackArray.map(item => (
                                    <DraggableItem key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                    <span 
                        className="feedingwindow__triangle-left"
                        onClick={scrollLeftHandler}
                    ></span>
                </div> : null
            }
        </>
    );
}