'use client';

import React, { useState, useEffect } from 'react';

const InvestmentTree = () => {
  const [treeHeight, setTreeHeight] = useState(0.5); // เริ่มต้นต้นไม้ที่สูง 0.5 เมตร
  const [treeStage, setTreeStage] = useState('🌱'); // เริ่มต้นที่ต้นกล้า
  const [growthRate, setGrowthRate] = useState(0.05); // อัตราการเติบโตเริ่มต้น
  const [waterLevel, setWaterLevel] = useState(100); // ระดับน้ำเริ่มต้นที่ 100%
  const [message, setMessage] = useState(''); // ข้อความเมื่อต้นไม้ตาย
  const [maxHeightReached, setMaxHeightReached] = useState(false); // ตรวจสอบว่าเกิน 10 เมตรหรือยัง

  // ฟังก์ชันรดน้ำต้นไม้
  const waterTree = () => {
    if (waterLevel < 100) {
      setWaterLevel(100);
      setGrowthRate(growthRate + 0.05); // เพิ่มอัตราการเติบโตเมื่อรดน้ำ
    }
  };

  // ฟังก์ชันกลับไปหน้า Home
  const goToHome = () => {
    window.location.href = '/'; // เปลี่ยนเส้นทางไปยังหน้า Home
  };

  // การทำงานทุกๆ 1 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      if (waterLevel <= 0) {
        setTreeStage('🪵'); // ถ้าน้ำหมดเปลี่ยนต้นไม้เป็นตอไม้
        setGrowthRate(0); // หยุดการเติบโต
        setMessage('Your tree died because you didn\'t water it!'); // ข้อความเมื่อต้นไม้ตาย
      } else {
        if (treeHeight < 10) {
          setTreeHeight((prev) => prev + growthRate); // เพิ่มความสูงของต้นไม้ตามอัตราการเติบโต
        } else {
          setMaxHeightReached(true); // ถ้าต้นไม้ถึง 10 เมตรแล้ว
        }
        setWaterLevel((prev) => Math.max(prev - 2, 0)); // ลดระดับน้ำลงทุกๆ วินาที
      }
    }, 1000);

    // การเปลี่ยนแปลงระยะต้นไม้
    if (treeHeight >= 10) {
      setTreeStage('🌳'); // ต้นไม้เต็มวัยเมื่อสูงถึง 10 เมตร
    } else if (treeHeight >= 3) {
      setTreeStage('🌿'); // ต้นไม้ขนาดกลางเมื่อสูงถึง 3 เมตร
    } else if (treeHeight >= 1.5) {
      setTreeStage('🌱'); // ต้นกล้า
    }

    return () => clearInterval(interval);
  }, [growthRate, waterLevel, treeHeight]);

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px', backgroundColor: '#e6f7ff', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* ปุ่ม Home */}
      <button 
        onClick={goToHome} 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '15px 30px',
          fontSize: '1.2em',
          backgroundColor: '#FF5733',
          color: 'white',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#FF4500'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#FF5733'}
        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
      >
        🏠 Home
      </button>
      
      <h1 style={{
        fontSize: '3em', 
        marginBottom: '20px', 
        color: '#2c6f2f', 
        textShadow: '4px 4px 6px rgba(0, 0, 0, 0.2)', 
        transition: 'font-size 0.5s ease-in-out'
      }}>🌱 Grow Your Tree 🌳</h1>
      
      <p style={{
        fontSize: '1.6em', 
        fontWeight: 'bold', 
        color: '#333', 
        transition: 'color 0.3s ease'
      }}>
        Tree Height: {treeHeight.toFixed(2)}m
      </p>
      
      <p style={{
        fontSize: '1.3em', 
        color: waterLevel < 20 ? 'red' : 'black', 
        fontWeight: 'bold',
        transition: 'color 0.3s ease, font-size 0.3s ease'
      }}>
        Water Level: {waterLevel}% 
      </p>

      {/* ข้อความเมื่อต้นไม้ตาย */}
      {message && <p style={{ color: 'red', fontSize: '1.5em', fontWeight: 'bold' }}>{message}</p>}
      {/* ข้อความเมื่อต้นไม้เต็มที่ */}
      {maxHeightReached && <p style={{ color: 'green', fontSize: '1.5em', fontWeight: 'bold' }}>Your tree has reached its maximum height of 10 meters!</p>}

      <div>
        <button 
          onClick={waterTree} 
          style={{
            margin: '15px', 
            padding: '20px', 
            fontSize: '1.3em', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            borderRadius: '15px', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1e88e5'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          💦 Water the Tree
        </button>
      </div>

      <div style={{
        fontSize: `${7 + treeHeight}em`, // เพิ่มขนาดของต้นไม้ตามการเติบโต
        marginTop: '20px', 
        transition: 'font-size 0.5s ease', 
        transform: `scale(${treeHeight / 10})`, 
        animation: 'treeGrowth 2s ease-out'
      }}>
        {treeStage}
      </div>
      
      <p style={{
        fontSize: '1.4em', 
        marginTop: '20px', 
        color: '#333', 
        transition: 'color 0.3s ease'
      }}>Click to water your tree! 🌳💦</p>
      
      <style>{`
        @keyframes treeGrowth {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default InvestmentTree;
