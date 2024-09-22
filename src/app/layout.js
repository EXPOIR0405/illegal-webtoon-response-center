import './globals.css';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '불법 웹툰 대응 센터',
  description: '불법 웹툰 사이트 대응 및 웹툰 작가 지원 센터',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics 4 (gtag.js) 추가 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-F18W5EQVT5"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F18W5EQVT5');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}