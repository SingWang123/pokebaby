"use client";
import React from 'react';
import { Signup } from 'component/signup';
import { Signin } from 'component/signin';
import { useState } from 'react';

export default function HomePage() {
    const [switchSignup, setSwitchSignup] = useState(false);

    const toggleSignup = () => {
        setSwitchSignup((preState) => !preState);
    }

    return (
        <div className="home">
            <div>
                <div className="gametitle">
                口袋寶貝
                </div>
                {
                    switchSignup ? (
                        <Signup toggleSignup = {toggleSignup} />
                    ):(
                        <Signin toggleSignup = {toggleSignup} />
                    )
                }
            </div>
        </div>
    );
}