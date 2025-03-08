'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef(null); // ใช้ useRef แทน useState สำหรับ timer
  const router = useRouter();

  useEffect(() => {
    // เริ่มจับเวลาใหม่ทุกครั้งที่มีการคลิก
    if (clickCount > 0 && clickCount < 3) {
      if (timerRef.current) {
        clearTimeout(timerRef.current); // เคลียร์ timer เก่า
      }

      // ตั้งเวลา 3 วินาทีใหม่ทุกครั้งที่คลิก
      timerRef.current = setTimeout(() => {
        setClickCount(0);  // รีเซ็ต clickCount หลังจาก 3 วินาที
      }, 3000); // ตั้งเวลา 3 วินาที
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current); // เคลียร์เวลาที่กำหนดเมื่อ component unmount หรือคลิกครบ
      }
    };
  }, [clickCount]); // ใช้ clickCount เป็น dependency

  useEffect(() => {
    if (clickCount === 3) {
      // ใช้ useEffect เพื่อให้แน่ใจว่า router.push() ทำงานหลังจากการเรนเดอร์
      router.push('/investment-tree');
    }
  }, [clickCount, router]); // useEffect จะทำงานเมื่อ clickCount เปลี่ยน

  const handleClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <div onClick={handleClick}>
      <h1>Trading Journal</h1>
    </div>
  );
};

export default Logo;
