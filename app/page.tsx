"use client";
import React from 'react';
import "../styles/signin.css" ;
import { Signup } from 'component/LoginPage/signup';
import { Signin } from 'component/LoginPage/signin';
import { useState } from 'react';
import animations from 'component/animation';

export default function HomePage() {
    const [switchSignup, setSwitchSignup] = useState(false);

    const toggleSignup = () => {
        setSwitchSignup((preState) => !preState);
    }

    return (
        <div className="home__signin">
            <div>
                <div className="gametitle">
                    <img src = '/logo.png' />
                </div>
                {
                    switchSignup ? (
                        <Signup toggleSignup = {toggleSignup} />
                    ):(
                        <Signin toggleSignup = {toggleSignup} />
                    )
                }

                <div className = 'signin__petposition--1'>
                    <animations.Animation0005/>
                </div>
                <div className = 'signin__petposition--3'>
                    <animations.Animation0001/>
                </div>
                <div className = 'signin__petposition--2'>
                    <animations.Animation0002/>
                </div>
                <div className = 'signin__petposition--4'>
                    <animations.Animation0003/>
                </div>
                <div className = 'signin__petposition--5'>
                    <animations.Animation0001/>
                </div>
                <div className = 'signin__petposition--6'>
                    <animations.Animation0004/>
                </div>
            </div>
        </div>
    );
}