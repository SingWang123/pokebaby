"use client";
import { useState } from "react";
import { useAuthContext } from "@context/AuthContext";
import { findBackpackItems} from "utils/backpackItemUtils";
import { useBackpackContext } from "@context/BackpackContext";

export const Backpack = () => {
    const {user} = useAuthContext();
    const [showBackpack, setShowBackpack] = useState(false);
    const {backpackArray,setBackpackArray} = useBackpackContext();    


    const toggleShowBackpack = () => {
        setShowBackpack((preState) => !preState);

        if (!showBackpack){
            findBackpackItems(user?.uid,setBackpackArray);
        }
    }

    return (
        <>
            <div className = 'home__petname'>
                <div className = 'petname__name'>{petName}</div>
            </div>
        </>   
    );
}