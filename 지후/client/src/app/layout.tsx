import ReactQueryProvider from '@/hooks/ReactQueryProvider';
import ChakraProvider from '@/hooks/useChakraProvider';
import "./globals.css";
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthSession from './_components/AuthSession';

dayjs.locale('ko');


const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'block',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko" translate='no' className="notranslate">
      <body className={poppins.className}>
        <AuthSession>
          <ReactQueryProvider>
            <ToastContainer />
            {children}
          </ReactQueryProvider>
        </AuthSession>
      </body>
    </html >
  );
}
