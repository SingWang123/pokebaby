"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

//定義紀錄型別
export interface PetParameter{
    petname: string;
    petid: string;
    round: number;
    brave : number;
    perseverance : number;
    cool : number;
    dexterity : number;
    dedication : number;
    happy : number;
    full : number;
    fullUpdateTime : Date;
}

//定義context的型別
interface PetParameterType{
    petParameter : PetParameter;
    setPetParameter: React.Dispatch<React.SetStateAction<PetParameter>>;
}

//設定初始值
export const defaultPetParameter: PetParameter = {
    petname: "蛋蛋",
    petid: "0001",
    round: 10,
    brave: 10,
    perseverance: 5,
    cool: 5,
    dexterity: 5,
    dedication: 5,
    happy : 30,
    full : 30,
    fullUpdateTime: new Date()
};

const defaultContext : PetParameterType = {
    petParameter : defaultPetParameter,
    setPetParameter: () => {}
}

export const ParameterContext = createContext<PetParameterType>(defaultContext);

export const ParameterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [petParameter, setPetParameter] = useState<PetParameter>(defaultPetParameter);

    return (
        <ParameterContext.Provider value={{ petParameter, setPetParameter }}>
            {children}
        </ParameterContext.Provider>
    );
};

// 使用 useContext 來訪問 context
export const useParameter = () => useContext(ParameterContext);
