'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Globe, Gift, Trophy, Wallet } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LocaleLink from '@/components/LocaleLink';

export default function Notification() {
  const t = useTranslations('notification');

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-3xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
          <h2 className="text-3xl font-bold text-primary-1 mb-8">
            {t('subtitle')}
          </h2>

          <Card className="bg-white p-6 mb-8 shadow-sm rounded-xl">
            <p className="flex items-center justify-center text-gray-800 mb-4">
              <Gift className="h-5 w-5 mr-2 text-red-500" />
              {t('benefits.title')}
            </p>
            <p className="flex items-center justify-center text-sm text-gray-600">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              {t('benefits.coupon')}
            </p>
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              <Image
                src="https://tethermax.io/static/images/animation/Notification.gif"
                alt="Notification Bell Animation"
                width={256}
                height={256}
              />
            </div>
          </Card>
        </div>

        <Card className="mb-8 bg-[#f0f9f5] border-none p-6">
          <h3 className="text-center text-lg font-medium mb-6">
            {t('notifications.title')}
          </h3>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 flex items-center">
              <Wallet className="h-5 w-5 mr-3 text-primary-1" />
              <span>{t('notifications.types.withdrawal')}</span>
            </div>
            <div className="bg-white rounded-lg p-4 flex items-center">
              <Gift className="h-5 w-5 mr-3 text-primary-1" />
              <span>{t('notifications.types.airdrop')}</span>
            </div>
            <div className="bg-white rounded-lg p-4 flex items-center">
              <Trophy className="h-5 w-5 mr-3 text-primary-1" />
              <span>{t('notifications.types.competition')}</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            <Bell className="inline h-4 w-4 mr-1" />
            {t('notifications.toggle')}
          </p>
        </Card>

        <div className="text-center">
          <Card className="bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-3">{t('app.title')}</h3>
            <p className="text-lg mb-4">{t('app.subtitle')}</p>
            <p className="text-sm text-gray-600 mb-6">{t('app.exclusive')}</p>

            <p className="text-2xl font-medium text-gray-700 mb-8">
              {t('app.download.title')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <LocaleLink href="/download">
                <Button className="w-full bg-primary-1 hover:bg-primary-2 hover:text-primary-1 py-3 text-lg">
                  {t('app.download.googleStore')}
                </Button>
              </LocaleLink>
              <LocaleLink href="/download">
                <Button className="w-full bg-primary-1 hover:bg-primary-2 hover:text-primary-1 py-3 text-lg">
                  {t('app.download.appStore')}
                </Button>
              </LocaleLink>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
