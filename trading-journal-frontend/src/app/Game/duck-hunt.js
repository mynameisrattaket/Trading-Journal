'use client';  // ให้ใช้ 'use client' สำหรับ Next.js 13 App Router

import React, { useState } from 'react';

const DuckHunt = () => {
  const [score, setScore] = useState(0);

  const shootDuck = () => {
    setScore(score + 1);
  };

  return (
    <div>
      <h1>Duck Hunt</h1>
      <p>Score: {score}</p>
      <button onClick={shootDuck}>Shoot Duck</button>
      {/* เพิ่มฟังก์ชันของเกม Duck Hunt ที่นี่ */}
    </div>
  );
};

export default DuckHunt;
