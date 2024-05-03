import ReactQueryProvider from '@/hooks/ReactQueryProvider';
import ChakraProvider from '@/hooks/useChakraProvider';
import "./globals.css";
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { Poppins } from 'next/font/google';

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
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html >
  );
}
