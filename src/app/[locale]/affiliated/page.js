import Header from './components/Header';
import ExchangeTable from '@/components/ExchangesTable.js';
import { getPlatforms } from '@/services/platformService.js';
import ClientScrollingLogos from './components/ClientScrollingLogos.js';
import { siteConfig } from '@/config/metadata';
import { getTranslations } from 'next-intl/server';

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
      siteName: siteConfig.name,
      locale: 'en_US',
    },
  };
}

export default async function AffiliatedPage() {
  const exchanges = await getPlatforms();
  const plainExchanges = exchanges.map((exchange) => exchange.toJSON());

  return (
    <div className="flex-col flex items-center justify-center">
      <div className="w-full space-y-8 bg-background-1">
        <Header />
        <ClientScrollingLogos exchanges={plainExchanges} />
        <ExchangeTable exchanges={plainExchanges} />
      </div>
    </div>
  );
}
