import { getTranslations } from 'next-intl/server';

export const siteConfig = {
  name: 'DegenMax',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  defaultLocale: 'en_US',
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'affiliated.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    robots: 'index, follow',
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      siteName: 'DegenMax',
      locale: 'en_US',
    },
  };
}
