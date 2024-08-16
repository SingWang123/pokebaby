import React from 'react';
import { useDrop } from 'react-dnd';

interface DropAreaProps {
  onDropItem: (item: { effect: { [key: string]: number } }) => void;
}

const DropArea: React.FC<DropAreaProps> = ({ onDropItem }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => {
      onDropItem(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div 
        ref={drop} 
        style={{ backgroundColor: isOver ? 'lightgreen' : 'lightgray', padding: '20px', minHeight: '100px' }}
    >
      放置區域
    </div>
  );
};

export default DropArea;
