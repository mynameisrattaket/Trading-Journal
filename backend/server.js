require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise'); // ✅ ใช้ promise-based
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

// ✅ ใช้ connection pool เพื่อรองรับหลาย request พร้อมกัน
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10, // ✅ กำหนด max connection
  queueLimit: 0,
});

// ✅ Test database connection
pool.getConnection()
  .then(conn => {
    console.log('✅ Connected to the database');
    conn.release();
  })
  .catch(err => console.error('❌ Database connection error:', err));

  app.get('/exchange-rates', async (req, res) => {
    try {
      const [results] = await pool.query('SELECT id, currency, rate_to_usd FROM exchange_rates');
      res.json(results); // ส่งข้อมูลกลับไปยัง frontend
    } catch (err) {
      console.error('Error fetching exchange rates:', err);
      res.status(500).send('Error fetching exchange rates');
    }
  });

// ✅ ลงทะเบียน (Register)
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // เช็คว่า user มีในฐานข้อมูลหรือยัง
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Hash รหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, 10);

    // เพิ่ม user ใหม่
    await pool.query("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", [username, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ เข้าสู่ระบบ (Login)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // ค้นหาผู้ใช้จากฐานข้อมูล
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    // ตรวจสอบรหัสผ่าน
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful!", user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
