import React, { createContext, useContext, useState, ReactNode } from 'react';

type MessageContextType = {
    message: string | null;
    setMessage: (message: string | null) => void;
    counter: number;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState<string | null>(null);
    const [counter, setCounter] = useState<number>(0);

    // 更新消息并增加计数器
    const updateMessage = (newMessage: string | null) => {
        setMessage(newMessage);
        setCounter(prevCounter => prevCounter + 1); // 每次更新时增加计数器
    };

    return (
        <MessageContext.Provider value={{ message, setMessage: updateMessage, counter }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => {
    const context = useContext(MessageContext);
    if (context === undefined) {
        throw new Error('useErrorContext must be used within an ErrorProvider');
    }
    return context;
};