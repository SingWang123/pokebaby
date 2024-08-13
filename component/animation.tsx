"use client";
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export const EggAnimation = () => {
  const animContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animContainer.current) {
      const animation = lottie.loadAnimation({
        container: animContainer.current, // 要放的容器名稱
        renderer: 'svg', // 
        loop: true, // 重複動畫
        autoplay: true, // 自動播放
        path: "/lottie/egg_animation.json" // 要讀取的json檔案位置
      });

      return () => {
        animation.destroy(); // 組件卸載時銷毀動畫
      };
    }
  }, []);

  return <div id="anim" ref={animContainer} className="animation-container"></div>;
};

export const BraveAAnimation = () => {
  const animContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animContainer.current) {
      const animation = lottie.loadAnimation({
        container: animContainer.current, // 要放的容器名稱
        renderer: 'svg', // 
        loop: true, // 重複動畫
        autoplay: true, // 自動播放
        path: "/lottie/brave_a_animation.json" // 要讀取的json檔案位置
      });

      return () => {
        animation.destroy(); // 組件卸載時銷毀動畫
      };
    }
  }, []);

  return <div id="anim" ref={animContainer} className="animation-container"></div>;
};

export const CoolAAnimation = () => {
  const animContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animContainer.current) {
      const animation = lottie.loadAnimation({
        container: animContainer.current, // 要放的容器名稱
        renderer: 'svg', // 
        loop: true, // 重複動畫
        autoplay: true, // 自動播放
        path: "/lottie/cool_a_animation.json" // 要讀取的json檔案位置
      });

      return () => {
        animation.destroy(); // 組件卸載時銷毀動畫
      };
    }
  }, []);

  return <div id="anim" ref={animContainer} className="animation-container"></div>;
};

export const DedicationAAnimation = () => {
  const animContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animContainer.current) {
      const animation = lottie.loadAnimation({
        container: animContainer.current, // 要放的容器名稱
        renderer: 'svg', // 
        loop: true, // 重複動畫
        autoplay: true, // 自動播放
        path: "/lottie/dedication_a_animation.json" // 要讀取的json檔案位置
      });

      return () => {
        animation.destroy(); // 組件卸載時銷毀動畫
      };
    }
  }, []);

  return <div id="anim" ref={animContainer} className="animation-container"></div>;
};

export const PerseveranceAAnimation = () => {
  const animContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animContainer.current) {
      const animation = lottie.loadAnimation({
        container: animContainer.current, // 要放的容器名稱
        renderer: 'svg', // 
        loop: true, // 重複動畫
        autoplay: true, // 自動播放
        path: "/lottie/perseverance_a_animation.json" // 要讀取的json檔案位置
      });

      return () => {
        animation.destroy(); // 組件卸載時銷毀動畫
      };
    }
  }, []);

  return <div id="anim" ref={animContainer} className="animation-container"></div>;
};

export const DexterityAAnimation = () => {
  const animContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animContainer.current) {
      const animation = lottie.loadAnimation({
        container: animContainer.current, // 要放的容器名稱
        renderer: 'svg', // 
        loop: true, // 重複動畫
        autoplay: true, // 自動播放
        path: "/lottie/dexterity_a_animation.json" // 要讀取的json檔案位置
      });

      return () => {
        animation.destroy(); // 組件卸載時銷毀動畫
      };
    }
  }, []);

  return <div id="anim" ref={animContainer} className="animation-container"></div>;
};