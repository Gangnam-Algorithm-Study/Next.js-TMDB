import ReactQueryProvider from '@/hooks/ReactQueryProvider';
import ChakraProvider from '@/hooks/useChakraProvider';
import "./globals.css";
import Header from './_components/Header';
import Footer from './_components/Footer'; // 추가된 줄
import { Stack } from '@chakra-ui/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" translate='no' className="notranslate">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html >
  );
}
