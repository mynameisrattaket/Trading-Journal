import 'bootstrap/dist/css/bootstrap.min.css';  // นำเข้า Bootstrap
import './styles/globals.css';  // นำเข้า Tailwind CSS และการตั้งค่า
import { Roboto, Poppins } from 'next/font/google';  // นำเข้าฟอนต์จาก Google Fonts

// ตั้งค่าฟอนต์ Roboto และ Poppins
const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

export const metadata = {
  title: "My Next.js App",  // ชื่อแอปของคุณ
  description: "An app styled with Bootstrap, Tailwind, and custom fonts",  // คำอธิบายแอป
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* การนำเข้า Font Awesome CSS */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
        />
        {/* Meta Tags for Title and Description */}
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className={`${roboto.className} ${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
