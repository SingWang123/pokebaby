"use client";
import React, { useState} from 'react';
import { useAuthContext } from '@context/AuthContext';
import { findBackpackItems} from "utils/backpackItemUtils";
import { useBackpackContext } from '@context/BackpackContext';
import DraggableItem from './draggaleitem';



export const Feeding = () => {
    const [showFeedingFoodWindow, setShowFeedingFoodWindow] = useState<boolean>(false);
    const {user} = useAuthContext();
    const {backpackArray,setBackpackArray} = useBackpackContext();

    const toggleShowFeedingFoodWindow = () => {
        setShowFeedingFoodWindow((preState) => !preState);
        
        if (!showFeedingFoodWindow){
            findBackpackItems(user?.uid,setBackpackArray);
        }
    }

    return (
        <>
            { showFeedingFoodWindow ? (
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
                    <div className = "feedingwindow">
                        <div 
                            className = "backpack__closebutton"
                            onClick = {toggleShowFeedingFoodWindow}
                        >
                        </div>
                        <div>                            
                            {backpackArray.map(item => (
                                <DraggableItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </>
            ):(
                <div className = "button__action">
                    <p 
                        className = "button__word"
                        onClick = {toggleShowFeedingFoodWindow}    
                    >
                        餵食
                    </p>
                    <hr className = "button__line"></hr>
                </div>
            )
            }
        </>
    );
}