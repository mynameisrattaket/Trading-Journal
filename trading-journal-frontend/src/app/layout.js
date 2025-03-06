import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';
import { Roboto, Poppins } from 'next/font/google';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ClientComponent from './contexts/ClientComponent';
import Head from 'next/head';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });
const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: "Trading Journal",
  description: "An app styled with Bootstrap, Tailwind, and custom fonts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </Head>
      <body className={`${roboto.className} ${poppins.className} antialiased`}>
        <AuthProvider>
          <LanguageProvider>
            <ClientComponent>
              {children}
            </ClientComponent>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
