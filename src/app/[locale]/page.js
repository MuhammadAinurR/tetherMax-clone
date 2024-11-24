import { getPlatforms } from '@/services/platformService';
import ExchangeTable from '@/components/ExchangesTable';
import { getEvents } from '@/services/eventService';
import UserContent from '@/components/UserContent';
import { getTranslations } from 'next-intl/server';
import Events from '@/components/Events';
import { siteConfig } from '@/config/metadata';
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

export default async function Home() {
  const [platformsData, eventsData] = await Promise.all([
    getPlatforms(),
    getEvents(),
  ]);

  // Convert Sequelize models to plain objects
  const plainPlatforms = platformsData.map((platform) => platform.toJSON());
  const plainEvents = eventsData.map((event) => event.toJSON());

  return (
    <div className="flex flex-col items-center justify-center">
      <UserContent exchangesTable={plainPlatforms} />

      {/* Events */}
      <Events events={plainEvents} />

      <div className="w-full h-[16px] bg-[#F0F3F9]"></div>
      {/* Exchange Table */}
      <ExchangeTable exchanges={plainPlatforms} />
    </div>
  );
}
