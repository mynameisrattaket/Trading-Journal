require('dotenv').config();
const express = require('express');
const { Pool } = require('pg'); // ใช้ pg สำหรับ PostgreSQL
const bcrypt = require('bcrypt');
const cors = require('cors');
const { auth } = require("./firebase-admin"); 

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from specific origins
    if (!origin || ['http://localhost:3000', 'https://trading-journal-new.vercel.app'].includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the origin
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// ใช้ connection pool สำหรับ PostgreSQL
const pool = new Pool({
  host: process.env.PGHOST, // ใช้ environment variable สำหรับ host
  user: process.env.PGUSER, // user ที่ใช้ในการเชื่อมต่อ
  password: process.env.PGPASSWORD, // รหัสผ่าน
  database: process.env.PGDATABASE, // ชื่อฐานข้อมูล
  port: process.env.PGPORT, // พอร์ตที่ใช้เชื่อมต่อ
});

// ✅ Test PostgreSQL connection
pool.connect()
  .then(client => {
    console.log('✅ Connected to the PostgreSQL database');
    client.release(); // ปล่อย connection หลังจากเชื่อมต่อ
  })
  .catch(err => console.error('❌ Database connection error:', err));

app.get('/exchange-rates', async (req, res) => {
  try {
    // ใช้ PostgreSQL query แทน MySQL query
    const result = await pool.query('SELECT id, currency, rate_to_usd FROM exchange_rates');
    res.json(result.rows); // ส่งข้อมูลกลับไปยัง frontend
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
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Hash รหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, 10);

    // เพิ่ม user ใหม่
    await pool.query("INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)", [username, email, hashedPassword]);

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
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

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

// ✅ API Login ด้วย Google
app.post("/login/google", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "Missing idToken" });
  }

  try {
    // ✅ ตรวจสอบ idToken
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    // ✅ ตรวจสอบว่าผู้ใช้มีใน PostgreSQL หรือยัง
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      // ✅ ถ้ายังไม่มี -> บันทึกลงฐานข้อมูล (ใช้ `uid` จาก Google เป็น `uid` ของผู้ใช้)
      await pool.query("INSERT INTO users (username, email, uid) VALUES ($1, $2, $3)", [
        name,    // username
        email,   // email
        uid      // ใช้ `uid` จาก Google
      ]);
    } else {
      // ✅ ถ้ามีอยู่แล้ว -> อัปเดตข้อมูลของผู้ใช้ (อัปเดต `uid`)
      await pool.query("UPDATE users SET uid = $1 WHERE email = $2", [
        uid,    // ใช้ `uid` จาก Google
        email   // ใช้ `email` เพื่อหาผู้ใช้
      ]);
    }

    // ✅ ดึงข้อมูลผู้ใช้
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = userResult.rows[0];

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        uid: user.uid
      }
    });
  } catch (err) {
    console.error("Error verifying Google token:", err);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

app.get('/api/trades', async (req, res) => {
  try {
    const query = `
      SELECT "id", "user_id", "symbol", "trade_type", "entry_price", 
             "exit_price", "quantity", "stop_loss", "take_profit", 
             "status", "created_at", "closed_at"
      FROM "trades";
    `;
    
    // Execute the query using async/await
    const result = await pool.query(query); // Executes the query and waits for the results
    
    res.json(result.rows); // Return the results as JSON
  } catch (err) {
    console.error('Error executing query:', err);
    return res.status(500).json({ message: 'Error fetching data', error: err });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
