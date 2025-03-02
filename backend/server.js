require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { auth, provider } = require('./firebase-config'); // เพิ่มการนำเข้า Firebase
const { signInWithCredential, GoogleAuthProvider } = require('firebase/auth');

const app = express();
const port = process.env.PORT || 3001;  // ถ้าไม่มีพอร์ตจาก environment variable ให้ใช้ 3001

// ✅ เปิดการใช้งาน CORS
app.use(cors());

// ✅ ถ้าต้องการระบุ origin แบบเฉพาะเจาะจง (เช่นให้ frontend ที่รันที่ http://localhost:3000 เท่านั้นเข้าถึงได้)
app.use(cors({
  origin: 'http://localhost:3000', // เปลี่ยนเป็น URL ของ frontend ถ้าโฮสต์จริง
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

// เชื่อมต่อฐานข้อมูล
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint ลงทะเบียน (register)
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Username or email already exists' });
        }
        return res.status(500).json({ message: 'Registration failed, ' + err.message });
      }
      res.status(201).json({ message: 'Registration successful' });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint เข้าสู่ระบบ (login)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, result) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ message: 'Login failed' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    
    if (isMatch) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  });
});

// Endpoint เข้าสู่ระบบด้วย Google (Google login)
app.post('/api/google-login', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: 'ID Token is required' });
  }

  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;

    console.log('User details from Google:', user); // ✅ ตรวจสอบค่าที่ได้จาก Firebase

    const email = user.email;
    const username = user.displayName || 'Google User';
    const uid = user.uid; // ✅ ดึง UID ของ Firebase มาใช้
    const photo = user.photoURL || ''; // ✅ ดึงรูปโปรไฟล์ถ้ามี

    // เช็คว่า user มีในฐานข้อมูลหรือยัง
    const query = 'SELECT * FROM users WHERE uid = ?';
    db.query(query, [uid], (err, result) => {
      if (err) {
        console.error('Error finding user:', err);
        return res.status(500).json({ message: 'Login failed' });
      }

      if (result.length === 0) {
        // ✅ ถ้ายังไม่มีให้สร้างบัญชีใหม่
        const insertQuery = 'INSERT INTO users (uid, username, email, photo) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [uid, username, email, photo], (insertErr) => {
          if (insertErr) {
            console.error('Error inserting user:', insertErr);
            return res.status(500).json({ message: 'User creation failed' });
          }
          console.log('New user created:', username, email);  
          res.status(200).json({ message: 'Google login successful and new user created' });
        });
      } else {
        console.log('User already exists in database:', result);
        res.status(200).json({ message: 'Google login successful' });
      }
    });
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(500).json({ message: 'Google login failed' });
  }
});



// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
