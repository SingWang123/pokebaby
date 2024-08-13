"use client";
import React, { useEffect, useState } from 'react';
import { useParameter } from '@context/ParameterContext';
import { getPetParameter } from 'lib/firebase';
import { useAuthContext } from '@context/AuthContext';

const Parameter = () => {
    const [petData, setPetData] = useState<any[]>([]); // 用於保存從資料庫獲取的資料
    const { petParameter } = useParameter();
    const {user} = useAuthContext();
  
    useEffect(() => {
        let unsubscribe: (() => void) | undefined;
    
        if (user) {
          unsubscribe = getPetParameter(user.uid, setPetData);
        }
        console.log(petData);
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }, [user]);

     
    // 檢查 petData[0] 是否存在，如果不存在，顯示一個預設內容或加載指示
    if (!petData[0]) {
        return <div>Loading...</div>;
    }

    return (
    <>
        <div className = 'home__information'>
            <div className = 'information__stat'>勇敢：{petData[0]["brave"]}</div>
            <div className = 'information__stat'>堅毅：{petData[0]["perseverance"]}</div>
            <div className = 'information__stat'>冷靜：{petData[0]["cool"]}</div>
            <div className = 'information__stat'>靈巧：{petData[0]["dexterity"]}</div>
            <div className = 'information__stat'>奉獻：{petData[0]["dedication"]}</div>
        </div>
        <div className = 'home__actionpoint'>
            <div className = 'actionpoint__title'>還剩</div>
            <div className = 'actionpoint__point'>{petData[0]["round"]}回合</div>
            {/* <div className = 'actionpoint__bg'></div>     */}
        </div>
    </>
    );
}

export default Parameter;