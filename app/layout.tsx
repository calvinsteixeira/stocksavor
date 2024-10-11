import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'StockSavor',
  description: 'Desfrute o melhor que o seu estoque de alimentos pode oferecer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="pt-BR">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {children}
        </body>
      </html>
    </QueryProvider>
  );
}
