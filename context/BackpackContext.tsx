import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BackpackItem {
    icon: string;
    count: number;
    effect : {[key:string]: number};
}

interface BackpackContextType {
    backpackArray: BackpackItem[];
    setBackpackArray: React.Dispatch<React.SetStateAction<BackpackItem[]>>;
}

const BackpackContext = createContext<BackpackContextType | undefined>(undefined);

export const useBackpackContext = () => {
    const context = useContext(BackpackContext);
    if (!context) {
        throw new Error('useBackpackContext must be used within a BackpackProvider');
    }
    return context;
};

export const BackpackProvider = ({ children }: { children: ReactNode }) => {
    const [backpackArray, setBackpackArray] = useState<BackpackItem[]>([]);

    return (
        <BackpackContext.Provider value={{ backpackArray, setBackpackArray }}>
            {children}
        </BackpackContext.Provider>
    );
};
