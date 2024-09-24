"use client";
import React from "react";
import { useState } from "react";
import { linkAnonymousAccount, registerUser } from "lib/FirebaseAuth";
import { useAuthContext } from "@context/AuthContext";

type AccountBindingProps = {
    toggleAccountBinding : () => void;
};

export const AccountBinding : React.FC<AccountBindingProps> = ({toggleAccountBinding}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user} = useAuthContext();
    
    const handleAccountBinding = () => {
        if (email.trim() === "" || password.trim() === "") {
            alert("請輸入電子信箱和密碼");
            return;
        }

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmail(email);
        } else {
            alert("請輸入正確的電子郵件格式");
            return 
        }

        if (password.length < 6){
            alert("密碼需大於6碼");
            return;
        }

        linkAnonymousAccount(email,password)
            .then((user) => {
                alert("帳號綁定成功，請返回首頁");
                toggleAccountBinding(); // 成功後切回登入頁面
            })
            .catch((error) =>{
                alert("綁定失敗，請確認email是否已經註冊");
            });
    };

    return(
        <>
            {user && user.isAnonymous ? (
                <div className = "signup_title">
                    綁定帳號
                    <div className = "signin">
                        <label style = {{margin : "0px 10px"}}>
                            信箱
                        </label>
                        <input  
                            value = {email} 
                            onChange = {(e) => setEmail(e.target.value)}
                            placeholder = "請輸入電子信箱"
                            className = "signin__input"
                        >    
                        </input>
                    </div>
                    <div className = "signin">
                        <label style = {{margin : "0px 10px"}}>
                            密碼
                        </label>
                        <input 
                            type = "password"
                            value = {password} 
                            onChange = {(e) => setPassword(e.target.value)}
                            placeholder = "請輸入密碼"
                            className = "signin__input"
                        > 
                        </input>
                    </div>
                    <button 
                        onClick = {handleAccountBinding}
                        className = "button__type1"
                    >
                        綁定帳號
                    </button>
                    <button 
                        onClick = {toggleAccountBinding}
                        className = "button__type1"
                    >
                        返回首頁
                    </button>
                </div>
            ):(
                null
            )}
        </>
    )
}