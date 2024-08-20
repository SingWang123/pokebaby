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

    const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
        if (scrollRef.current !== null) {
            setIsDragging(true);
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
        }
    };
    
    const handleMouseLeaveOrUp = () => {
        setIsDragging(false);
    };
    
    const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        e.preventDefault();
        if (scrollRef.current !== null) {
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 3; // 3 是拖動速度調節係數
            scrollRef.current.scrollLeft = scrollLeft - walk;
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
            { showFeedingFoodWindow ? (
                <>
                    <div 
                        className = "feedingwindow__closebutton"
                        onClick = {toggleShowFeedingFoodWindow}
                    >
                    </div>
                    <div 
                        className = "feedingwindow"
                        ref = {scrollRef}
                        onMouseDown = {handleMouseDown}
                        onMouseLeave = {handleMouseLeaveOrUp}
                        onMouseUp = {handleMouseLeaveOrUp}
                        onMouseMove = {handleMouseMove}
                        >
                        <div>                            
                            {backpackArray.map(item => (
                                <DraggableItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </>
            ): null
            }
        </>
    );
}