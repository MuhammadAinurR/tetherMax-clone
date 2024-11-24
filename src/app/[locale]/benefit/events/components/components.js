'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { cn } from '@/libs/utils';
import { Skeleton } from '@/components/ui/skeleton';

const bannerImages = [
  {
    src: 'https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/93f55fba-9a70-4d26-b4bd-5050f8f53cff.png',
    alt: 'WSOT Competition',
    key: 'wsot',
  },
  {
    src: 'https://prod-tethermax.s3.ap-northeast-2.amazonaws.com/exchange/detail/425700c0-88de-4246-b8a2-b06d258b7102.png',
    alt: 'Second Banner',
    key: 'second',
  },
];

const EventsComponents = ({ events }) => {
  const t = useTranslations('events');
  const [activeTab, setActiveTab] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exchanges, setExchanges] = useState(['All']);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Extract unique tags for exchanges
        const uniqueTags = [
          'All',
          ...new Set(events.flatMap((event) => event.tags)),
        ];
        setExchanges(uniqueTags);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    pauseOnHover: true,
    accessibility: true,
    arrows: false,
    useCSS: true,
    useTransform: true,
    cssEase: 'ease-out',
    onSwipe: (direction) => {
      console.log('Swiped:', direction);
    },
  };

  // Filter events based on active tab
  const filteredEvents = events.filter(
    (event) => activeTab === 'All' || event.tags.includes(activeTab)
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <div className="relative h-[200px] md:h-[400px] lg:h-[600px] mb-12 rounded-xl overflow-hidden shadow-xl">
          <div className="cursor-grab active:cursor-grabbing h-full">
            <Slider {...settings}>
              {bannerImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-[200px] md:h-[400px] lg:h-[600px] select-none"
                >
                  <Image
                    src={image.src}
                    alt={t(`banners.${image.key}`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                    draggable={false}
                    className="pointer-events-none transition-transform duration-300"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="absolute bottom-6 right-6 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            <span className="font-medium">
              {t('banners.counter', {
                current: currentSlide + 1,
                total: bannerImages.length,
              })}
            </span>
          </div>
        </div>

        <section className="bg-transparent md:bg-white rounded-xl p-0 md:p-8 mb-12 md:shadow-md">
          <h2 className="text-3xl font-bold mb-3 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-gray-600 mb-8 text-center text-lg">
            {t('subtitle')}
          </p>

          <Tabs defaultValue="All" className="w-full">
            <div className="relative">
              {events.length === 0 ? (
                <div className="flex gap-2 px-4 overflow-x-auto">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-lg" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                  <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                  <TabsList className="relative flex w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    <div className="flex min-w-full justify-start gap-2 px-4">
                      {exchanges.map((exchange) => (
                        <TabsTrigger
                          key={exchange}
                          value={exchange}
                          onClick={() => setActiveTab(exchange)}
                          className={cn(
                            'px-4 py-0 rounded-lg snap-start scroll-ml-4',
                            'transition-all duration-200 ease-in-out',
                            'hover:bg-gray-100 focus:ring-2 focus:ring-offset-2',
                            'whitespace-nowrap flex-shrink-0'
                          )}
                        >
                          {exchange}
                        </TabsTrigger>
                      ))}
                    </div>
                  </TabsList>
                </>
              )}
            </div>
            <TabsContent value={activeTab} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.length === 0
                  ? [...Array(4)].map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardHeader>
                          <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-6 w-full mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                      </Card>
                    ))
                  : filteredEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        title={event.title}
                        reward={event.subTitle}
                        timeRange={`${new Date(event.startDate)
                          .toLocaleDateString('en-US', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                          })
                          .replace(
                            /(\d+)\/(\d+)\/(\d+)/,
                            '$3.$1.$2'
                          )} - ${new Date(event.endDate)
                          .toLocaleDateString('en-US', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                          })
                          .replace(/(\d+)\/(\d+)\/(\d+)/, '$3.$1.$2')}`}
                        imageUrl={event.imageUrl}
                        url={event.url}
                      />
                    ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
          <h3 className="font-semibold text-xl mb-4">{t('notes.title')}</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              {t('notes.item1')}
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              {t('notes.item2')}
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

function EventCard({ title, reward, timeRange, imageUrl, url }) {
  return (
    <Card
      className="overflow-hidden p-0 transition-all duration-300 hover:shadow-lg"
      onClick={() => window.open(url, '_blank')}
    >
      <div className="relative h-72 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardHeader className="p-4">
        <p className="text-sm text-gray-600 font-medium line-clamp-2">
          {title}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardTitle className="text-lg line-clamp-2 mb-3">{reward}</CardTitle>
        <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
          <Clock className="w-4 h-4 mr-2" />
          <span>{timeRange}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventsComponents;
