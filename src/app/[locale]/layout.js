import Navbar from '@/components/Navbar';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/i18nNavigation';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { siteConfig } from '@/config/metadata';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    robots: 'index, follow',
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_US',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/icon" type="image/png" sizes="32x32" />
          <Script
            id="tawk-script"
            strategy="lazyOnload"
            src="https://embed.tawk.to/673ca6882480f5b4f5a071d8/1id2el21h"
          />
          <style>{`
            @media (max-width: 767px) {
              #tawk-bubble-container {
                width: 200px !important;
                height: 300px !important;
                transform: scale(0.65);
                transform-origin: bottom right;
              }
            }
          `}</style>
        </head>
        <body>
          <ToastContainer />
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar />
            <div className="mt-[52px] md:mt-16">{children}</div>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
