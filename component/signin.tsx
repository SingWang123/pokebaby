"use client";
import React from "react";
import { useState } from "react";
import { signinOut, signinUser } from "lib/firebase";
import Link from "next/link";
import { User } from "firebase/auth";
import { useAuthContext } from "@context/AuthContext";

type SigninProps = {
    toggleSignup : () => void;
};

export const Signin : React.FC<SigninProps> = ({toggleSignup}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user} = useAuthContext();
    
    const handleSignin = () => {
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

        signinUser(email,password)
            .then((user) => {
                alert("恭喜登入成功");
            })
            .catch((error) =>{
                alert("登入失敗，請確認帳號密碼是否正確");
            });
    };

    const handleSignout = () => {
        signinOut();
    };

    return(
         <>
            { !user ? (
                // 沒有登入
                <div>
                    <div className="signin">
                        <label style={{ margin: "0px 10px" }}>
                            信箱
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="請輸入電子信箱"
                            className="signin__input"
                        />
                    </div>
                    <div className="signin">
                        <label style={{ margin: "0px 10px" }}>
                            密碼
                        </label>
                        <input
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="請輸入密碼"
                            className="signin__input"
                        />
                    </div>
                    <button 
                        onClick = {handleSignin}
                        className ="button__type1"
                    >
                        登入
                    </button>
                    <button 
                        onClick = {toggleSignup}
                        className="button__type1"
                    >
                        註冊新帳號
                    </button>
                </div>
            ) : (
                // 有登入
                <div className="signup_title">
                    {user.email}，歡迎回來！
                    <div className="index__button_bg">
                        <Link href="/main" style={{ textDecoration: 'none' }}>
                            <button 
                                className="button__type1"
                            >
                                點此開始
                            </button>
                        </Link>
                        <button
                            onClick={handleSignout}
                            className="button__type1"
                        >
                            切換帳號
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}