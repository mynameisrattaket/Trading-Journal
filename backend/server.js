const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// ใช้ dotenv เพื่อโหลดข้อมูลการตั้งค่าจาก .env
dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());

// เชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: 'caboose.proxy.rlwy.net', // จาก Railway
  user: 'root',
  password: process.env.MYSQL_PASSWORD, // ใช้ password ที่เก็บไว้ใน .env
  database: 'railway', // ชื่อฐานข้อมูล
  port: 29570,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint สำหรับการลงทะเบียนผู้ใช้ใหม่
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  // เพิ่มผู้ใช้ใหม่ในฐานข้อมูล
  const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err.stack);
      return res.status(500).json({ message: 'Registration failed' });
    }
    res.status(201).json({ message: 'Registration successful' });
  });
});

// Endpoint สำหรับการเข้าสู่ระบบ
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // ค้นหาผู้ใช้ในฐานข้อมูล
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error('Error finding user:', err.stack);
      return res.status(500).json({ message: 'Login failed' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result[0];
    if (user.password_hash === password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
