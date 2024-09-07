import { BackpackItem } from '@context/BackpackContext';
import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useRef } from 'react';

// 定義拖拽類型
const DragableItemTypes = {
  ITEM: "item",
};

interface DropAreaProps {
  onDropItem: (item : BackpackItem) => void;
  children: React.ReactNode; // 允許 DropArea 接受子組件
}

// 定義 useDrop collect 函數返回值的類型
interface DropCollectedProps {
  isOver: boolean;
}

const DropArea: React.FC<DropAreaProps> = ({ onDropItem, children }) => {
  const [{ isOver }, drop] = useDrop<BackpackItem, void, DropCollectedProps>({
    accept: DragableItemTypes.ITEM,
    drop: (item) => {
      onDropItem(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);


  return (
    <div 
      ref = {ref} 
    > 
      {children}
    </div>
  );
};

export default DropArea;

