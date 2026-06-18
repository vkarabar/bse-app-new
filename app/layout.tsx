import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Footer } from './(main)/footer';
import { Header } from './(main)/header';
import { MobileHeader } from '@/components/mobile-header';
import { MobileCallBar } from '@/components/mobile-call-bar';
import { LocaleProvider } from '@/components/locale-provider';
import { getLocale } from '@/lib/i18n/get-locale';
import { getDictionary, createTranslator } from '@/lib/i18n/get-dictionary';

const font = Montserrat({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = createTranslator(getDictionary(locale));

  return {
    title: t('metadata.home.title'),
    description: t('metadata.home.description'),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={font.className}>
        <LocaleProvider>
          <MobileHeader />
          <Header />
          <main className="pt-16 md:pt-0">{children}</main>
          <Footer />
          <MobileCallBar />
        </LocaleProvider>
      </body>
    </html>
  );
}
