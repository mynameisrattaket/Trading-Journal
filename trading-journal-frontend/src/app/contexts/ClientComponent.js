// src/app/contexts/ClientComponent.js

"use client";

import { useLanguage } from './LanguageContext';  // ใช้ useLanguage จาก LanguageContext

const ClientComponent = ({ children }) => {
  const { language } = useLanguage();  // เรียกใช้ useLanguage ที่นี่

  return (
    <div lang={language}>  {/* เปลี่ยนค่า lang ที่ระดับ div แทนการใช้ <html> */}
      {children}
    </div>
  );
};

export default ClientComponent;
