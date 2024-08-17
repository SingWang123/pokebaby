import React, { ComponentType, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import petData from 'public/items/pet.json';

// 定義一個接口來描述生成的動畫組件物件
interface AnimationComponents {
  [key: string]: ComponentType;
}

// 動態生成動畫組件的函數
const createAnimationComponent = (id: string, path: string) => {
  return () => {
    const animContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (animContainer.current) {
        const animation = lottie.loadAnimation({
          container: animContainer.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: path,
        });

        return () => {
          animation.destroy();
        };
      }
    }, [path]);

    return <div id={`anim-${id}`} ref={animContainer} style = {{height:"100%", width:"100%"}}></div>;
  };
};

// 從 JSON 中生成所有的動畫組件並匯出
const animations = Object.entries(petData).reduce<AnimationComponents>((acc, [phase, pets]) => {
  pets.forEach(pet => {
    const { id, path } = pet;
    acc[`Animation${id}`] = createAnimationComponent(id, path);
  });
  return acc;
}, {});

// 一次性匯出所有動態生成的動畫組件
export default animations;