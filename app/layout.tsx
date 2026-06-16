import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Footer } from './(main)/footer';
import { Header } from './(main)/header';
import { MobileHeader } from '@/components/mobile-header';
import { MobileCallBar } from '@/components/mobile-call-bar';

const font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'БСЕ Компани',
  description:
    'БСЕ Компани - Изработка и монтажа на роло гаражни врати. Продажба на мотори за лизгачки порти. Изработка и монтажа на Алуминиумски Перголи.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} pb-16 md:pb-0`}>
        <MobileHeader />
        <Header />
        {children}
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
