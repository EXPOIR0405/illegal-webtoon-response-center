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
        {/* Google Tag Manager script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','G-TTB216N4KD);
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=G-TTB216N4KD`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}