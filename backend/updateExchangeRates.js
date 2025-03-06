// C:\Users\NBODTKKU\Desktop\Trading-Journal\backend\updateExchangeRates.js
require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql2');
const moment = require('moment-timezone');
const cron = require('node-cron'); // เพิ่มการใช้ node-cron

const API_KEY = '6cfead6482daf1cd969cd8e0'; // แทนที่ด้วย API key ของคุณ
const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});


const currencies = ['THB', 'HKD', 'CNY', 'AUD', 'EUR', 'GBP', 'NZD', 'CAD', 'CHF', 'JPY'];

// เช็ควันปัจจุบันว่าได้ดึงข้อมูลแล้วหรือยัง
const isTodayUpdated = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT MAX(updated_at) AS last_update FROM exchange_rates';
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const lastUpdate = result[0].last_update;
        const now = moment();
        // ถ้า last_update เป็นวันนี้หรือไม่เกิน 24 ชั่วโมงที่แล้ว ก็ไม่อัปเดตใหม่
        if (lastUpdate && moment(lastUpdate).isSame(now, 'day')) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

const updateExchangeRates = async () => {
  try {
    const alreadyUpdated = await isTodayUpdated();

    if (alreadyUpdated) {
      console.log('API already updated today. Skipping...');
      return;
    }

    // ดึงข้อมูลอัตราแลกเปลี่ยนจาก API
    axios.get(url)
      .then(response => {
        const rates = response.data.conversion_rates;

        currencies.forEach(currency => {
          const rate = rates[currency];

          if (!rate) {
            console.error(`Rate for ${currency} not found`);
            return;
          }

          // ใช้ moment-timezone เพื่อแปลงเวลาเป็นเวลาประเทศไทย (ICT)
          const thaiTime = moment().tz("Asia/Bangkok").format('YYYY-MM-DD HH:mm:ss');

          // คำสั่ง SQL สำหรับการอัปเดตข้อมูลในฐานข้อมูล
          const query = `
            INSERT INTO exchange_rates (currency, rate_to_usd, updated_at)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE rate_to_usd = ?, updated_at = ?;
          `;

          // อัปเดตข้อมูลในฐานข้อมูล
          db.query(query, [currency, rate, thaiTime, rate, thaiTime], (err, result) => {
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
  } catch (error) {
    console.error('Error checking last update:', error);
  }
};

// ตั้งค่า cron job ให้รันทุกวันเวลา 01:00 AM (เวลา ICT)
cron.schedule('0 1 * * *', () => {
  updateExchangeRates();
}, {
  timezone: "Asia/Bangkok" // ตั้งค่า timezone เป็น Asia/Bangkok (ICT)
});

// เรียกใช้ฟังก์ชัน updateExchangeRates โดยตรง (กรณีทดสอบ)
updateExchangeRates();

// Export ฟังก์ชัน updateExchangeRates
module.exports = { updateExchangeRates };
