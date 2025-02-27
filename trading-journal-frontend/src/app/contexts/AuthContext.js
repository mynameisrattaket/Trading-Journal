// src/context/AuthContext.js

'use client';

import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase-config';  // ปรับเส้นทางให้ตรง
import { onAuthStateChanged, signOut } from 'firebase/auth';

// สร้าง context
const AuthContext = createContext();

// สร้าง provider สำหรับใช้ในส่วนต่างๆ ของแอป
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ตรวจสอบสถานะผู้ใช้งานเมื่อเริ่มต้น
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // ถ้ามีผู้ใช้งาน จะอัพเดท state
    });
    
    return () => unsubscribe(); // เมื่อ unmount จะหยุดการเชื่อมต่อ
  }, []);

  // ฟังก์ชันสำหรับออกจากระบบ
  const logout = async () => {
    try {
      await signOut(auth);  // ใช้ Firebase Sign Out
      setUser(null);  // เคลียร์ข้อมูลผู้ใช้
    } catch (error) {
      console.error("Error signing out: ", error);  // ถ้ามีข้อผิดพลาด
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);  // hook สำหรับใช้งาน context
