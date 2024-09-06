import React from 'react';

interface PentagonChartProps {
  parameters: number[]; // 指定為數字陣列類型
  changes: number[];
}

const PentagonChart: React.FC<PentagonChartProps> = ({ parameters, changes }) => {
    const maxParam = 50;
    const points = [
    { x: 50, y: 10 },
    { x: 90, y: 40 },
    { x: 75, y: 90 },
    { x: 25, y: 90 },
    { x: 10, y: 40 },
    ];

    const labels = ["勇敢", "堅毅", "冷靜", "靈巧", "奉獻"];

    // 计算内嵌多边形的顶点
    const innerPoints = parameters.map((param, index) => {      
        const ratio = param / maxParam; // 归一化参数值
        const centerX = 50;
        const centerY = 50;
        const pointX = centerX + (points[index].x - centerX) * ratio;
        const pointY = centerY + (points[index].y - centerY) * ratio;
        return { x: pointX, y: pointY };
    });

    return (
        <div className = 'parameter__container'>
            <svg width="100" height="100" viewBox="-20 -20 150 200">
                {/* 外層五角形 */}
                <polygon 
                    className = 'parameter__outerpolygon'
                    points = {points.map(p => `${p.x},${p.y}`).join(' ')} 
                />
                
                {/* 中心到五個頂點的虛線 */}
                {points.map((point, index) => (
                    <line
                        key={index}
                        x1="50" y1="50" // 中心點
                        x2={point.x} y2={point.y} // 對應頂點
                        stroke="black"
                        strokeDasharray="2, 2" // 設定虛線
                        className="parameter__lines"
                    />
                ))}

                {/* 內層依照參數出現的多邊形 */}
                <polygon
                    className = 'parameter__innerpolygon' 
                    points={innerPoints.map(p => `${p.x},${p.y}`).join(' ')} 
                />

                {/* 固定標題 */}
                {labels.map((label, index) => (
                <text
                    className = 'parameter__title' 
                    key={index}
                    x={points[index].x}
                    y={points[index].y} // 向上移動文字
                    textAnchor="middle"
                    dx={index === 0 ? '0' : // 上方
                        index === 1 ? '20' :  // 右上
                        index === 2 ? '18' :  // 右下
                        index === 3 ? '-18' :  // 左下
                        '-20'} // 左上
                    dy={index === 0 ? '-15' : // 上方
                        index === 1 ? '-5' :  // 右上
                        index === 2 ? '5' :  // 右下
                        index === 3 ? '5' :  // 左下
                        '-5'} // 左上
                >
                    {label}
                </text> 
                ))}

                {/* 参数文字显示 */}
                {parameters.map((param, index) => (
                <text 
                    className = 'parameter__title'  
                    key = {index} 
                    x = {points[index].x} 
                    y = {points[index].y} 
                    fill = "black" 
                    fontSize = "12" 
                    textAnchor = "middle"
                    dx={index === 0 ? '0' : // 上方
                        index === 1 ? '20' :  // 右上
                        index === 2 ? '15' :  // 右下
                        index === 3 ? '-15' :  // 左下
                        '-20'} // 左上
                    dy={index === 0 ? '-2' : // 上方
                        index === 1 ? '8' :  // 右上
                        index === 2 ? '18' :  // 右下
                        index === 3 ? '18' :  // 左下
                        '8'} // 左上
                >
                    {param}
                    {changes[index] !== 0 && (
                        <tspan
                            className = 'parameter__change_word' 
                            dx="3"
                            dy="0"
                            fill={changes[index] > 0 ? 'red' : 'green'}
                        >
                            {changes[index] > 0 ? `+${changes[index]}` : changes[index]}
                        </tspan>
                    )}
                </text>
                ))}
            </svg>
        </div>
    );
};

export default PentagonChart;