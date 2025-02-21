import { Geist, Geist_Mono } from "next/font/google";  // นำเข้าฟอนต์จาก Google
import './globals.css';  // นำเข้าไฟล์ CSS ที่คุณตั้งค่า

// ตั้งค่าฟอนต์ Geist Sans และ Geist Mono
const geistSans = Geist({
  variable: "--font-geist-sans",  // ตั้งค่าตัวแปรฟอนต์
  subsets: ["latin"],  // กำหนด subsets เป็น "latin"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",  // ตั้งค่าตัวแปรฟอนต์
  subsets: ["latin"],  // กำหนด subsets เป็น "latin"
});

export const metadata = {
  title: "My Next.js App",  // ชื่อแอปของคุณ
  description: "An app styled with custom fonts and global styles",  // คำอธิบายแอป
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}  // ใช้ฟอนต์ที่ตั้งค่าไว้
      >
        {children}  {/* เนื้อหาทั้งหมดของแอป */}
      </body>
    </html>
  );
}
