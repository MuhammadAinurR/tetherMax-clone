'use client';

import Image from 'next/image';
import { DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function UIDBinding() {
  const router = useRouter();
  const t = useTranslations('uidBinding');

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-2">{t('title')}</h1>
        <h2 className="text-2xl font-bold text-primary-1 text-center mb-8">
          {t('subtitle')}
        </h2>

        <div className="flex flex-col items-center mb-12">
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-2">
            {t('notices.required')}
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
            {t('notices.reward')}
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <Image
            src="/placeholder.svg"
            alt={t('images.envelope')}
            width={200}
            height={200}
          />
        </div>

        <Card className="mb-12">
          <CardContent className="flex flex-col items-center p-6">
            <h3 className="text-xl font-semibold mb-4">
              {t('steps.signup.title')}
            </h3>
            <Image
              src="/placeholder.svg"
              alt={t('images.signup')}
              width={300}
              height={600}
            />
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardContent className="flex flex-col items-center p-6">
            <h3 className="text-xl font-semibold mb-2">
              {t('steps.binding.title')}
            </h3>
            <p className="text-gray-600 mb-4">{t('steps.binding.subtitle')}</p>
            <Image
              src="https://tethermax.io/static/images/benefit/connection_step_2_En.png"
              alt={t('images.binding')}
              width={300}
              height={600}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-100 rounded-full p-4 mb-4">
            <DollarSign className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{t('reward.amount')}</h3>
          <p className="text-xl mb-2">{t('reward.title')}</p>
          <p className="text-gray-600 mb-4">{t('reward.description')}</p>
          <Button
            size="lg"
            className="bg-primary-1 text-white hover:bg-primary-1"
            onClick={() => router.push('/registExchange')}
          >
            {t('reward.button')}
          </Button>
        </div>
      </main>
    </div>
  );
}
