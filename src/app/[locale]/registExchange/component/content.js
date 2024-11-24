'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import LocaleLink from '@/components/LocaleLink';
import { useTranslations } from 'next-intl';

export default function RegistExchangeContent({ platforms }) {
  const router = useRouter();
  const [isMore, setIsMore] = useState(false);
  const [exchanges, setExchanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('userContent.registerExchange');

  const fetchExchanges = useCallback(async () => {
    try {
      setIsLoading(true);

      const formattedExchanges = platforms
        .map((exchange) => ({
          src: exchange.titleImageUrl,
          link: exchange.url || '',
          alt: `${exchange.name || 'Exchange'} logo`,
          hasLink: !!exchange.url,
        }))
        .sort((a, b) => (b.hasLink ? 1 : 0) - (a.hasLink ? 1 : 0));

      setExchanges(formattedExchanges);
    } catch (error) {
      console.error('Error fetching exchanges:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExchanges();
  }, [fetchExchanges]);

  const ExchangeButton = ({ exchange, index }) => (
    <div className="relative">
      <button
        className={`flex items-center justify-center border-2 rounded-xl h-[64px] w-full transition-all bg-gray-400 ${
          exchange.hasLink
            ? 'hover:border-primary-1 hover:shadow-md hover:-translate-y-0.5'
            : 'cursor-not-allowed opacity-70'
        }`}
        onClick={() => exchange.hasLink && window.open(exchange.link, '_blank')}
        disabled={!exchange.hasLink}
      >
        <Image
          src={exchange.src}
          alt={exchange.alt}
          width={150}
          height={36}
          className="h-[40px] w-auto"
          priority={index < 4}
        />
      </button>
      {!exchange.hasLink && (
        <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center backdrop-blur-[2px]">
          <span className="text-white text-sm font-medium">Coming Soon</span>
        </div>
      )}
    </div>
  );

  const renderExchangeGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {isLoading
        ? Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <Skeleton className="h-[64px] w-full" />
              </div>
            ))
        : exchanges
            .slice(0, isMore ? exchanges.length : 6)
            .map((exchange, index) => (
              <ExchangeButton key={index} exchange={exchange} index={index} />
            ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 bg-[#F0F3F9] min-h-screen px-4 py-6">
      <div className="max-w-3xl mx-auto w-full">
        <Card className="rounded-xl shadow-sm mb-6">
          <CardHeader className="pb-4 space-y-2">
            <CardTitle className="text-2xl font-bold">
              {t('step1.title', 'Join the Exchange')}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              {t(
                'step1.description',
                'Create an exchange account eligible for Cashback'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderExchangeGrid()}
            <Button
              variant="secondary"
              className="w-full mt-4 py-5 text-sm font-medium hover:bg-gray-100"
            >
              {t(
                'step1.compareButton',
                'Curious about the benefits of each exchange?'
              )}
            </Button>
            <hr className="my-4" />
            <Button
              variant="link"
              className="w-full text-primary-1 text-lg font-bold hover:text-primary-1/80"
              onClick={() => setIsMore(!isMore)}
            >
              {isMore ? t('showLess', 'Show Less') : t('showMore', 'Show More')}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm mb-6">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              {t('step2.title', 'Bind UID')}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              {t(
                'step2.description',
                'Please verify the UID and bind it to your account.'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LocaleLink href="/uidlinking">
              <Button className="w-full bg-primary-2 text-primary-1 hover:bg-primary-2/90 py-6 text-lg font-medium transition-colors">
                {t('step2.button', 'Bind UID')}
              </Button>
            </LocaleLink>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              {t('step3.title', 'Invite Friends & Earn More')}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              {t(
                'step3.description',
                'Share the wealth! Invite friends with your redemption code and both get rewarded 🎁'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LocaleLink href="/benefit/invitation-code">
              <Button className="w-full bg-primary-2 text-primary-1 hover:bg-primary-2/90 py-6 text-lg font-medium transition-colors">
                {t('step3.button', 'Share & Earn USDT')}
              </Button>
            </LocaleLink>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
