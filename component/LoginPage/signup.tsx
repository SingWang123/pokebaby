"use client";
import React from "react";
import { useState } from "react";
import { registerUser } from "lib/FirebaseAuth";
import { Signin } from "./signin";
import { useAuthContext } from "@context/AuthContext";

type SignupProps = {
    toggleSignup : () => void;
};

export const Signup : React.FC<SignupProps> = ({toggleSignup}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user} = useAuthContext();
    
    const handleSignup = () => {
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

        registerUser(email,password)
            .then((user) => {
                alert("恭喜註冊成功");
            })
            .catch((error) =>{
                alert("註冊失敗，請確認email是否已經註冊");
            });
    };

    return(
        <>
            { !user ? (
                <div className = "signup_title">
                    註冊新帳號
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
                        onClick = {handleSignup}
                        className = "button__type1"
                    >
                        註冊
                    </button>
                    <button 
                        onClick = {toggleSignup}
                        className = "button__type1"
                    >
                        返回登入
                    </button>
                </div>
            ):(
                <Signin toggleSignup = {toggleSignup} />
            )}
        </>
    )
}