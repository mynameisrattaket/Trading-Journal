const express = require("express");
const { Pool } = require('pg'); // ใช้ pg สำหรับ PostgreSQL
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// เปิดใช้งาน CORS สำหรับโดเมนที่ระบุ
app.use(cors({
  origin: "*", // เปิดให้ทุกโดเมนสามารถเข้าถึงได้
  methods: ["GET", "POST"], // อนุญาตให้ใช้เมธอด GET และ POST
  allowedHeaders: ["Content-Type"], // อนุญาต headers ที่ต้องการ
}));

// สร้างการเชื่อมต่อแบบ pool กับฐานข้อมูล PostgreSQL
const pool = new Pool({
  host: process.env.PGHOST, // ใช้ environment variable สำหรับ host
  user: process.env.PGUSER, // user ที่ใช้ในการเชื่อมต่อ
  password: process.env.PGPASSWORD, // รหัสผ่าน
  database: process.env.PGDATABASE, // ชื่อฐานข้อมูล
  port: process.env.PGPORT, // พอร์ตที่ใช้เชื่อมต่อ
});

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
const getUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (err, results) => {
      if (err) {
        reject(new Error("Error executing query: " + err.stack));
      } else {
        resolve(results.rows); // ผลลัพธ์จาก PostgreSQL จะเก็บใน .rows
      }
    });
  });
};

// API ที่ตอบกลับข้อมูลจากฐานข้อมูล
app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users); // ส่งข้อมูลผู้ใช้ทั้งหมดกลับ
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users.", error: err.message });
  }
});

// API หน้าแรก
app.get("/", (req, res) => {
  res.send("Hello from Trading Journal! API is working.");
});

// ฟังการร้องขอจากพอร์ตที่กำหนด
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
