import React from 'react';
import { useDrag } from 'react-dnd';

// 定義拖拽類型
const DragableItemTypes = {
  ITEM: "item",
};

// 定義 DraggableItemProps 類型
interface DraggableItemProps {
  item: {
    id: string;
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

  // 確保 drag 函數被用作 ref 屬性
  return (
    <div
      // ref={drag} // 正確使用 drag 作為 ref
      style={{ opacity: isDragging ? 0.5 : 1 }} // 設置透明度以反映拖拽狀態
      className="backpack__list"
    >
      <img 
        src={item.icon}
        className="backpack__icon" 
        alt={`item-${item.id}`} // 添加 alt 屬性以提高可訪問性
      />
      <div className="backpack__word">
        數量：{item.count}
      </div>
      <div className="backpack__word">
        {Object.entries(item.effect).map(([key, value]) => (
          value > 0 && <div key={key}>{key} ＋{value}</div>
        ))}
      </div>
    </div>
  );
};

export default DraggableItem;
