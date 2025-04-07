import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaHome, FaChartBar } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai'; // ใช้ไอคอน +
import axios from 'axios';

// Styled components for the sidebar
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
  color: ${(props) => (props.theme.cardBg === '#fff' ? '#333' : '#fff')};
  border: 2px solid ${(props) => (props.theme.cardBg === '#fff' ? '#ddd' : '#fff')};
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
    color: ${(props) => (props.theme.cardBg === '#fff' ? '#333' : '#fff')};
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
    background: ${(props) => props.theme.cardBg};
    color: ${(props) => (props.theme.cardBg === '#fff' ? '#333' : '#fff')};
  }

  select {
    cursor: pointer;
  }

  h3 {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => (props.theme.cardBg === '#fff' ? '#333' : '#fff')};
    transition: all 0.3s ease-in-out;
  }
`;

// Modal Component for New Trade Form
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: ${(props) => props.theme.cardBg};
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${(props) => (props.theme.cardBg === '#fff' ? '#333' : '#fff')};
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: ${(props) => props.theme.cardBg};
  color: ${(props) => (props.theme.cardBg === '#fff' ? '#333' : '#fff')};
`;

const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: ${(props) => props.theme.cardBg};
  color: ${(props) => (props.theme.cardBg === '#fff' ? '#333' : '#fff')};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const SidebarComponent = ({ handleNavigation }) => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [amountUSD, setAmountUSD] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('THB');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [tradeDetails, setTradeDetails] = useState({
    symbol: '',
    tradeType: 'BUY',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    stopLoss: '',
    takeProfit: '',
  });

  // Fetch exchange rates
  useEffect(() => {
    axios.get('http://localhost:3001/exchange-rates')
      .then((response) => {
        setExchangeRates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });
  }, []);

  // Calculate conversion when amount or currency changes
  useEffect(() => {
    if (amountUSD && selectedCurrency) {
      const rate = exchangeRates.find(rate => rate.currency === selectedCurrency);
      if (rate) {
        setConvertedAmount(amountUSD * rate.rate_to_usd);
      }
    }
  }, [amountUSD, selectedCurrency, exchangeRates]);

  // Handle new trade form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTradeDetails({ ...tradeDetails, [name]: value });
  };

  // Handle form submission for new trade
  const handleTradeSubmit = () => {
    console.log('Trade details:', tradeDetails);
    // Add logic to handle trade submission (e.g., send to API)
    setShowModal(false); // Close modal after submission
  };

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
          <h3>Converted Amount: {convertedAmount.toFixed(2)} {selectedCurrency}</h3>
        )}
      </ExchangeRate>

      <SidebarButton onClick={() => setShowModal(true)}>
        <AiOutlinePlus />
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

      {/* Modal for New Trade */}
      {showModal && (
        <ModalBackground>
          <ModalContainer>
            <ModalHeader>New Trade</ModalHeader>
            <form onSubmit={handleTradeSubmit}>
              <InputField
                type="text"
                name="symbol"
                value={tradeDetails.symbol}
                onChange={handleInputChange}
                placeholder="Symbol (e.g., AAPL)"
              />
              <SelectField
                name="tradeType"
                value={tradeDetails.tradeType}
                onChange={handleInputChange}
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </SelectField>
              <InputField
                type="number"
                name="entryPrice"
                value={tradeDetails.entryPrice}
                onChange={handleInputChange}
                placeholder="Entry Price"
              />
              <InputField
                type="number"
                name="exitPrice"
                value={tradeDetails.exitPrice}
                onChange={handleInputChange}
                placeholder="Exit Price"
              />
              <InputField
                type="number"
                name="quantity"
                value={tradeDetails.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
              />
              <InputField
                type="number"
                name="stopLoss"
                value={tradeDetails.stopLoss}
                onChange={handleInputChange}
                placeholder="Stop Loss"
              />
              <InputField
                type="number"
                name="takeProfit"
                value={tradeDetails.takeProfit}
                onChange={handleInputChange}
                placeholder="Take Profit"
              />
              <ModalFooter>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit">Submit</button>
              </ModalFooter>
            </form>
          </ModalContainer>
        </ModalBackground>
      )}
    </Sidebar>
  );
};

export default SidebarComponent;
