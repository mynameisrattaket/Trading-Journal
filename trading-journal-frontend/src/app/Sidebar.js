import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaHome, FaChartBar } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai'; // ใช้ไอคอน +
import axios from 'axios';

const Sidebar = styled.div`
  position: fixed;
  top: 90px;
  left: 0;
  width: 220px;
  height: calc(100vh - 90px);
  background: ${(props) => props.theme.cardBg};
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px 0 0 8px;
`;

const SidebarButton = styled.button`
  background: ${(props) => props.theme.cardBg};
  color: ${(props) =>
    props.theme.cardBg === '#fff' ? '#333' : '#fff'}; /* ใช้เทาอ่อนแทนสีดำในธีมขาว */
  border: 2px solid ${(props) =>
    props.theme.cardBg === '#fff' ? '#ddd' : '#fff'}; /* กรอบที่บางลงในธีมขาว */
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  width: 100%;
  text-align: left;
  
  &:hover {
    background: ${(props) => props.theme.buttonHover};
    color: ${(props) => props.theme.buttonTextHover};
    border-color: ${(props) => props.theme.buttonHover};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonFocus};
  }

  svg {
    font-size: 18px;
    color: ${(props) =>
      props.theme.cardBg === '#fff' ? '#333' : '#fff'}; /* ไอคอนที่สีเทาในธีมขาว */
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const ExchangeRate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 14px;

  label {
    font-weight: bold;
  }

  input, select {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  h3 {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const SidebarComponent = ({ handleNavigation }) => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [amountUSD, setAmountUSD] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('THB');
  const [convertedAmount, setConvertedAmount] = useState(null);

  // ดึงข้อมูลอัตราแลกเปลี่ยนจาก API
  useEffect(() => {
    axios.get('http://localhost:3001/exchange-rates')  // ตั้งค่าให้ตรงกับ backend
      .then((response) => {
        setExchangeRates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });
  }, []);

  // คำนวณอัตราแลกเปลี่ยนเมื่อจำนวนเงินหรือสกุลเงินที่เลือกเปลี่ยน
  useEffect(() => {
    if (amountUSD && selectedCurrency) {
      const rate = exchangeRates.find(rate => rate.currency === selectedCurrency);
      if (rate) {
        setConvertedAmount(amountUSD * rate.rate_to_usd); // คำนวณจาก USD เป็นสกุลเงินที่เลือก
      }
    }
  }, [amountUSD, selectedCurrency, exchangeRates]);

  return (
    <Sidebar>
      <ExchangeRate>
        <label>Amount in USD: </label>
        <input
          type="number"
          value={amountUSD}
          onChange={(e) => setAmountUSD(e.target.value)}
          placeholder="Enter amount in USD"
        />
        <label>Choose Currency: </label>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {exchangeRates.map((rate) => (
            <option key={rate.id} value={rate.currency}>
              {rate.currency}
            </option>
          ))}
        </select>
        {convertedAmount !== null && (
          <h3>Converted Amount: {convertedAmount} {selectedCurrency}</h3>
        )}
      </ExchangeRate>

      <SidebarButton onClick={() => handleNavigation('/new-trade')}>
        <AiOutlinePlus /> {/* เปลี่ยนเป็นเครื่องหมาย + */}
        New Trade
      </SidebarButton>
      <SidebarButton onClick={() => handleNavigation('/dashboard')}>
        <FaHome />
        Dashboard
      </SidebarButton>
      <SidebarButton onClick={() => handleNavigation('/stats')}>
        <FaChartBar />
        Stats
      </SidebarButton>
    </Sidebar>
  );
};

export default SidebarComponent;
