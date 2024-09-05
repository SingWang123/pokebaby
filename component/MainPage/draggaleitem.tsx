import React, { useEffect } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { useRef } from 'react';
import { useBackpackContext } from '@context/BackpackContext';

// 定義拖拽類型
const DragableItemTypes = {
  ITEM: "item",
};

interface DraggableItemProps {
  item: {
    id: number;
    effect: { [key: string]: number };
    icon: string;
    count: number;
  };
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {
  const ref = useRef<HTMLImageElement>(null);

  // 使用 useDrag hook 來設置拖拽邏輯
  const [{ isDragging }, drag, preview] = useDrag({
    type: DragableItemTypes.ITEM,
    item: { id: item.id, effect: item.effect },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }, [item]);

  // 將 ref 直接傳遞給 drag 和預覽
  drag(ref);

  return (
    item.count <= 0 ? ( 
      null
    ) : (
      <>
        <DragPreviewImage connect={preview} src={item.icon} />
        <img
          ref={ref} 
          style={{ opacity: isDragging ? 0.5 : 1, border: 0 }} 
          src={item.icon}
          className="feedingwindow__icon" 
          alt={`item-${item.id}`} 
        />
        <span className='feedingwindow__count'>
          {item.count}
        </span>
      </>
    )  
  );
};

export default DraggableItem;
