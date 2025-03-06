import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';
import { Roboto, Poppins } from 'next/font/google';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';  // นำเข้า LanguageProvider
import ClientComponent from './contexts/ClientComponent';  // นำเข้า ClientComponent
import { motion } from 'framer-motion';  // เพิ่มการนำเข้า motion

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

export const metadata = {
  title: "Trading Journal",
  description: "An app styled with Bootstrap, Tailwind, and custom fonts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className={`${roboto.className} ${poppins.className} antialiased`}>
        <AuthProvider>
          <LanguageProvider>
            <ClientComponent>
              {/* เพิ่ม motion.div เพื่อทำการแสดงผลด้วย animation */}
              <motion.div
                initial={{ opacity: 0 }}  // เริ่มต้นด้วยความโปร่งใส 0
                animate={{ opacity: 1 }}  // ทำให้โปร่งใสเป็น 1 (ปรากฏขึ้น)
                transition={{ duration: 0.5 }}  // ใช้เวลา 0.5 วินาที
              >
                {children}
              </motion.div>
            </ClientComponent>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
