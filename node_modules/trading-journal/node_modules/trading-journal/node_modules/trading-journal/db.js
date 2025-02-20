// นำเข้า mysql2
const mysql = require('mysql2');

// ใช้ข้อมูล connection string ที่คุณได้รับจาก Railway
const connection = mysql.createConnection({
  host: 'caboose.proxy.rlwy.net', // หรือ 'mysql.railway.internal' หากทำงานภายใน Railway
  user: 'root', // user ที่ให้มาใน connection string
  password: 'DJeUZNHrWSgYRhKnvyaqnGfrVRKDGXrH', // password ที่ให้มา
  database: 'railway', // ชื่อฐานข้อมูล (ตาม connection string)
  port: 29570, // หรือ 3306 (ตามที่ได้จาก Railway)
});

// เชื่อมต่อฐานข้อมูล
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// ปิดการเชื่อมต่อเมื่อเสร็จ
connection.end();
