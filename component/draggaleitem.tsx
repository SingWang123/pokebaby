import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { useRef } from 'react';

// 定義拖拽類型
const DragableItemTypes = {
  ITEM: "item",
};

// 定義 DraggableItemProps 類型
interface DraggableItemProps {
  item: {
    id: number;
    effect: { [key: string]: number };
    icon: string;
    count: number;
  };
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {
  // 使用 useDrag hook 來設置拖拽邏輯
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragableItemTypes.ITEM,
    item: { id: item.id, effect: item.effect },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [item]);

  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  // 確保 drag 函數被用作 ref 屬性
  return (
    item.count <= 0 ? null:(
      <>
        <img 
          ref = {ref} // 正確使用 drag 作為 ref
          style = {{ opacity: isDragging ? 0.5 : 1,  border : 0 }} // 設置透明度以反映拖拽狀態
          src = {item.icon}
          className = "feedingwindow__icon" 
          alt = {`item-${item.id}`} // 添加 alt 屬性以提高可訪問性
        />
        <span className = 'feedingwindow__count'>
          {item.count}
        </span>
      </>
    )
  );
};

export default DraggableItem;
