"use client";
import { useState } from "react";
import { useAuthContext } from "@context/AuthContext";
import { PetParameter, useParameter } from '@context/ParameterContext';
import { writePetParameter } from "lib/WriteData";

export const PetName = () => {
    const {user} = useAuthContext();
    const {petParameter,setPetParameter} = useParameter();
    const [newPetName, setNewPetName] = useState("");
    const [showEditPetname, setShowEditPetname] = useState(false);    

    const toggleShowEdit = () => {
        setShowEditPetname((preState) => !preState);
    }

    const handleSetNewPetname = () => {
        if (newPetName.trim() === "") {
            alert("請輸入寵物名稱");
            return;
        }

        if (newPetName.length > 8) {
            alert("寵物名稱請小於8個字");
            return;
        } else {
            //寫入資料庫
            writePetParameter(
                newPetName,
                petParameter.petid,
                petParameter.round,
                petParameter.brave,
                petParameter.perseverance,
                petParameter.cool,
                petParameter.dexterity,
                petParameter.dedication,
                petParameter.happy,
                petParameter.full,
                petParameter.fullUpdateTime,
                user?.uid
            )
            //寫入context
            setPetParameter({
                ...petParameter,
                petname: newPetName
            })
            //關閉視窗
            setShowEditPetname(false);
        }
    };

    return (
        <>
            { showEditPetname ? (
                <div className = "petname__background">
                    <div className = "petname__edit_background">
                        <div 
                            className = "backpack__closebutton"
                            onClick = {toggleShowEdit}
                        >
                        </div>
                        <div className = "petname__edit_title">
                            設定寵物名稱
                        </div>
                        <input 
                            className = "petname__edit_input"
                            placeholder = {petParameter.petname}
                            onChange = {(e) => setNewPetName(e.target.value)}
                        >    
                        </input>
                        <div 
                            className = "petname__edit_button"
                            onClick = {handleSetNewPetname}
                        >
                            確定
                        </div>
                    </div>
                </div>
            ):(null)
            }
            <div className = 'home__petname'>
                <div className = 'petname__name'>
                    {petParameter.petname}
                </div>
                <div   
                    className = "petname__editbutton"
                    onClick = {toggleShowEdit}
                >
                </div>
            </div>
        </>
    );
}