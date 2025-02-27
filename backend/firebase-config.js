const admin = require('firebase-admin');
const path = require('path');

// กำหนดพาธไปยังไฟล์ Service Account Key
const serviceAccount = path.join(__dirname, 'config', 'trading-journal-dd458-firebase-adminsdk-fbsvc-679a01ac21.json');

// เริ่มต้น Firebase Admin SDK ด้วยไฟล์ Service Account Key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// สร้างตัวแปรสำหรับการใช้งาน Firebase Auth
const auth = admin.auth();

// Export เพื่อใช้งานในส่วนอื่นๆ ของโปรเจ็กต์
module.exports = { auth };
