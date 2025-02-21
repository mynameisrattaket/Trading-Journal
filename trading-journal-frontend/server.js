const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // เพิ่มการใช้ CORS

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// เปิดใช้งาน CORS สำหรับทุกโดเมน หรือสามารถระบุเฉพาะที่ต้องการ
app.use(cors({
  origin: "http://localhost:3000", // กำหนดให้ frontend ที่พอร์ต 3000 สามารถเข้าถึง backend ได้
}));

// สร้างการเชื่อมต่อแบบ pool กับฐานข้อมูล MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
const getUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (err, results) => {
      if (err) {
        reject("Error executing query:", err.stack);
      }
      resolve(results);
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
    return res.status(500).send("Error fetching users.");
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
