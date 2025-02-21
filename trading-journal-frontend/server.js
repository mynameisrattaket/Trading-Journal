const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = process.env.PORT || 3000;

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const connection = mysql.createConnection({
  host: "caboose.proxy.rlwy.net", // หรือลองใช้ "mysql.railway.internal" สำหรับการเชื่อมต่อภายใน Railway
  user: "root",
  password: "DJeUZNHrWSgYRhKnvyaqnGfrVRKDGXrH",
  database: "railway",
  port: 29570, // พอร์ตที่ให้มา
});

// เชื่อมต่อฐานข้อมูล
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database");
});

// API ที่ตอบกลับข้อมูลจากฐานข้อมูล
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Error fetching users.");
    }
    res.json(results); // ส่งข้อมูลผู้ใช้ทั้งหมดกลับ
  });
});

// API หน้าแรก
app.get("/", (req, res) => {
  res.send("Hello from Trading Journal! API is working.");
});

// ฟังการร้องขอจากพอร์ตที่กำหนด
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
