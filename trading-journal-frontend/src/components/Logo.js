'use client';  // ใช้ 'use client' ใน Next.js 13 สำหรับ component ที่ทำงานใน client-side

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // ใช้ useRouter จาก next/navigation

const Logo = () => {
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();  // ใช้ router ในการเปลี่ยนหน้า

  const handleClick = () => {
    setClickCount(clickCount + 1);

    if (clickCount + 1 === 3) {
      router.push('/Game/duck-hunt');  // ไปที่หน้า Duck Hunt เมื่อคลิก 3 ครั้ง
    }
  };

  return (
    <div
      onClick={handleClick}
    >
      <h1>Trading Journal</h1>
    </div>
  );
};

export default Logo;
