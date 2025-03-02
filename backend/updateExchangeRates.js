const axios = require('axios');
const mysql = require('mysql2');

const API_KEY = '6cfead6482daf1cd969cd8e0'; // แทนที่ด้วย API key ของคุณ
const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

const currencies = ['THB', 'HKD', 'CNY', 'AUD', 'EUR', 'GBP', 'NZD', 'CAD', 'CHF', 'JPY'];

const updateExchangeRates = () => {
  axios.get(url)
    .then(response => {
      const rates = response.data.conversion_rates;

      currencies.forEach(currency => {
        const rate = rates[currency];

        // คำสั่ง SQL สำหรับการอัปเดตข้อมูลในฐานข้อมูล
        const query = `
          INSERT INTO exchange_rates (currency, rate_to_usd, updated_at)
          VALUES (?, ?, NOW())
          ON DUPLICATE KEY UPDATE rate_to_usd = ?, updated_at = NOW();
        `;

        // อัปเดตข้อมูลในฐานข้อมูล
        db.query(query, [currency, rate, rate], (err, result) => {
          if (err) {
            console.error(`Error updating ${currency}:`, err);
          } else {
            console.log(`${currency} rate updated successfully`);
          }
        });
      });
    })
    .catch(error => {
      console.error('Error fetching exchange rates:', error);
    });
};

// ทำการส่งออกฟังก์ชัน updateExchangeRates
module.exports = { updateExchangeRates };
