"use client";
import React, { useState, useEffect } from 'react';
import { writePetParameter } from 'lib/WriteData';
import { PetParameter, useParameter } from '@context/ParameterContext';
import { useAuthContext } from '@context/AuthContext';
import { findBackpackItems} from "utils/backpackItemUtils";
import { useBackpackContext } from '@context/BackpackContext';
import { useDrag } from 'react-dnd';

interface DraggableItemProps {
    item: {
      id: string;
      effect: { [key: string]: number };
      icon: string;
      count: number;
    };
  }

export const Feeding = () => {
    const {petParameter, setPetParameter } = useParameter();
    const [highestAttribute,setHighestAttribute] = useState<string | null>("");
    const [showFeedingFoodWindow, setShowFeedingFoodWindow] = useState<boolean>(false);
    const {user} = useAuthContext();
    const {backpackArray,setBackpackArray} = useBackpackContext();
    const DraggableItemTypes = {Item : "item"};

    const toggleShowFeedingFoodWindow = () => {
        setShowFeedingFoodWindow((preState) => !preState);
        if (!showFeedingFoodWindow){
            findBackpackItems(user?.uid,setBackpackArray);
        }
    }

    // const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {
    //     const [{ isDragging }, drag] = useDrag(() => ({
    //       type: DraggableItemTypes.Item,
    //       item: { id: item.id, effect: item.effect },
    //       collect: (monitor) => ({
    //         isDragging: monitor.isDragging(),
    //       }),
    //     }));
    // }

    // useEffect(() => {
    //     if (petParameter.round === 5){
    //         // 使用屬性名稱聯合類型
    //         type Attribute = 'brave' | 'perseverance' | 'cool' | 'dexterity' | 'dedication';

    //         // 獲取屬性名稱陣列
    //         const attributes: Attribute[] = ['brave', 'perseverance', 'cool', 'dexterity', 'dedication'];

    //         const highestAttribute: Attribute = attributes.reduce((a, b) =>
    //             petParameter[a] > petParameter[b] ? a : b
    //         );
            
    //         setHighestAttribute(highestAttribute);
    //         console.log(highestAttribute);
    //     }
    // }, [petParameter.round]);

    function getRandomParameter() {
        const attributes = ['brave', 'perseverance', 'cool', 'dexterity', 'dedication'];
        const randomIndex = Math.floor(Math.random() * attributes.length);
        // 返回隨機選擇的屬性
        return attributes[randomIndex];
    }

    function getRandomInt(min : number, max : number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const handleFeedingFood = () => {
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
        })
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
                        <div className = "feedinwindow">
                            <div 
                                className = "backpack__closebutton"
                                onClick = {toggleShowFeedingFoodWindow}
                            >
                            </div>
                            {backpackArray.map((record, index) => (
                                <div key = {index} className = "backpack__list">
                                    <img 
                                        src = {backpackArray[index].icon}
                                        className = "backpack__icon" 
                                    />
                                    <div className = "backpack__word">
                                        數量：{backpackArray[index].count}
                                    </div>
                                    <div className = "backpack__word">
                                        {Object.entries(record.effect).map(([key, value]) => (
                                            value > 0 && <div key={key}>{key}＋{value}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
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