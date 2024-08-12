"use client";
import React from 'react';
import { Signup } from 'component/signup';
import { Signin } from 'component/signin';
import { useState } from 'react';
import { useAuth } from 'lib/firebase';

export default function HomePage() {
    const {user} = useAuth();
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
                        <Signup toggleSignup = {toggleSignup} user = {user}/>
                    ):(
                        <Signin toggleSignup = {toggleSignup} user = {user}/>
                    )
                }
            </div>
        </div>
    );
}