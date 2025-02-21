/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',  // ใช้ตัวแปรที่ตั้งไว้ใน globals.css
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'Helvetica', 'sans-serif'], // ใช้ฟอนต์ Geist
        mono: ['var(--font-geist-mono)', 'monospace'], // ใช้ฟอนต์ Geist Mono
      },
    },
  },
  plugins: [],
};
