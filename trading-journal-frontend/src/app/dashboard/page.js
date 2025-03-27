"use client";  // Make sure this is at the top of your file

import React, { useEffect, useState } from "react";
import styled, { keyframes, ThemeProvider, createGlobalStyle } from "styled-components";
import NavBar from '../NavBar';  // Adjust the path if needed
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'next/navigation';  // Use next/navigation in the app directory
import SidebarComponent from '../Sidebar';  // นำเข้ามาใช้

const lightTheme = {
  background: "#fff",
  text: "#000",
  subText: "#333",
  buttonBg: "#ff7b00",
  buttonText: "#fff",
  buttonHover: "#e66a00",
  cardBg: "#fff",
};

const darkTheme = {
  background: "#000",
  text: "#fff",
  subText: "#aab2c3",
  buttonBg: "#ff7b00",
  buttonText: "#fff",
  buttonHover: "#e66a00",
  cardBg: "#000",
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    animation: ${fadeIn} 0.5s ease-in-out;
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;  // ปรับให้ตารางชิดซ้าย
  padding: 40px 20px;
  position: relative;
  margin-top: 80px;  // เพิ่ม margin เพื่อไม่ให้ตารางไปชนกับ Navbar
  width: 100%;  // ทำให้ container กว้างเต็มหน้าจอ
  overflow-x: auto;  // ถ้าเนื้อหายาวเกินกว่าพื้นที่แสดง จะสามารถเลื่อนออกข้างได้
`;

const Table = styled.table`
  width: 100%;  // ทำให้ตารางกว้างเต็มหน้าจอ
  border-collapse: collapse;
  margin-top: 20px;
  max-width: 100%;  // กำหนดความกว้างสูงสุดของตารางเพื่อให้ไม่เกินขอบ
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  // เพิ่มเงาให้ตารางดูมีมิติ
  overflow: hidden;
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;  // เพิ่มขอบล่างให้แยกคอลัมน์ชัดเจน
  }

  th {
    background-color: ${(props) => props.theme.buttonBg};  // สีพื้นหลังของหัวตาราง
    color: ${(props) => props.theme.buttonText};  // เปลี่ยนสีตัวหนังสือในหัวตาราง
    font-weight: bold;
  }

  tr:hover {
    background-color: ${(props) => props.theme.subText};  // เปลี่ยนพื้นหลังเมื่อวางเมาส์
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;


const TableCell = styled.td`
  color: ${(props) => props.theme.text};  // ปรับสีตัวหนังสือให้สอดคล้องกับธีม
  font-size: 16px;
  word-wrap: break-word;  // ป้องกันข้อความยาวๆ ไม่ให้เกินขอบ
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.buttonText};
`;

const TableRow = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.subText};
    cursor: pointer;
  }
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, locales } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const [trades, setTrades] = useState([]); // State to store trade data
  const router = useRouter();  // Use next/navigation for client-side routing

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        // ตรวจสอบ URL ถูกต้อง (ใช้ http://localhost:3001/api/trades)
        const response = await fetch('http://localhost:3001/api/trades');
        const data = await response.json();
        console.log('Data fetched from API:', data);  // แสดงผลข้อมูลที่ได้จาก API
        setTrades(data);   // อัพเดตข้อมูลที่ได้รับลงใน state
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };
    
    fetchTrades();
  }, []); // Run this effect only once when the component mounts  

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem('theme', newTheme);
    }
  };

  const currentLocale = locales && locales[language] ? locales[language] : locales?.en || {};

  const handleNavigation = (path) => {
    router.push(path);  // Use push method for routing
  };

  // ฟังก์ชันสำหรับจัดรูปแบบวันที่และเวลา
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <NavBar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        language={language} 
        toggleLanguage={toggleLanguage} 
      />
      <Container>
        <SidebarComponent handleNavigation={handleNavigation} />
        <Table>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>User ID</TableHeader>
              <TableHeader>Symbol</TableHeader>
              <TableHeader>Trade Type</TableHeader>
              <TableHeader>Entry Price</TableHeader>
              <TableHeader>Exit Price</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Stop Loss</TableHeader>
              <TableHeader>Take Profit</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Created At</TableHeader>
              <TableHeader>Closed At</TableHeader>
            </tr>
          </thead>
          <tbody>
            {trades.length > 0 ? (
              trades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell>{trade.id}</TableCell>
                  <TableCell>{trade.user_id}</TableCell>
                  <TableCell>{trade.symbol}</TableCell>
                  <TableCell>{trade.trade_type}</TableCell>
                  <TableCell>{trade.entry_price}</TableCell>
                  <TableCell>{trade.exit_price}</TableCell>
                  <TableCell>{trade.quantity}</TableCell>
                  <TableCell>{trade.stop_loss}</TableCell>
                  <TableCell>{trade.take_profit}</TableCell>
                  <TableCell>{trade.status}</TableCell>
                  <TableCell>{formatDateTime(trade.created_at)}</TableCell>
                  <TableCell>{formatDateTime(trade.closed_at)}</TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <TableCell colSpan="12">No trades found</TableCell>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
