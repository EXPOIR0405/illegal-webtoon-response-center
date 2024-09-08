import './globals.css';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '불법 웹툰 대응 센터',
  description: '불법 웹툰 사이트 대응 및 웹툰 작가 지원 센터',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}