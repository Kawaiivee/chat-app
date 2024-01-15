import React, { useState, useEffect, useContext, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../context/socket';

const DoodleCanvas = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState<any[]>([]);

  const draw = (ctx, point) => {
    ctx.strokeStyle = 'green';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.lineTo(point.x , point.y);
    ctx.stroke();
  };

  const handleCanvasClicked = (e, ctx) => {
    const newPoint = { x: e.clientX, y: e.clientY };
    setPoints([...points, newPoint]);
    console.log(newPoint);
    draw(ctx, newPoint);
  };

  const handleClear = () => {
    setPoints([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
    points.forEach((point) => draw(ctx, point));
  });

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      style={{ border: '1px solid grey' }}
      onMouseDown={(e) =>handleCanvasClicked(e, canvasRef?.current?.getContext('2d'))}
    />
  )
}

export default DoodleCanvas;