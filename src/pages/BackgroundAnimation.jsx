import React from 'react';
import './BackgroundAnimation.css'; // Импортируем CSS для фона

const BackgroundAnimation = () => {
  return (
    <div className="box">
      <div className="wave -one"></div>
      <div className="wave -two"></div>
      <div className="wave -three"></div>
    </div>
  );
};

export default BackgroundAnimation;
