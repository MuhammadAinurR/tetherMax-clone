'use client';

import {
  Shield,
  Infinity,
  Smile,
  HandIcon,
  FileTextIcon,
  UsersIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import LocaleLink from '@/components/LocaleLink';
import { Card } from '@/components/ui/card';

export default function ServiceIntro() {
  const t = useTranslations();
  const [activeStep, setActiveStep] = useState(0);

  // Define steps array
  const steps = [
    {
      text: t('serviceIntro.howToEnjoy.steps.0'),
      highlight: true,
      imgUrl: '/images/service-intro/1.webp',
    },
    {
      text: t('serviceIntro.howToEnjoy.steps.1'),
      imgUrl: '/images/service-intro/2.png',
    },
    {
      text: t('serviceIntro.howToEnjoy.steps.2'),
      imgUrl: '/images/service-intro/3.webp',
    },
    {
      text: t('serviceIntro.howToEnjoy.steps.3'),
      imgUrl: '/images/service-intro/4.png',
    },
  ];

  const barData = [
    { label: 'Top 5%', value: 3488, color: 'bg-primary-1' },
    { label: '5-20%', value: 934, color: 'bg-primary-1' },
    { label: '25-50%', value: 229, color: 'bg-primary-1' },
    { label: '50-75%', value: 54, color: 'bg-gray-400' },
    { label: '75-100%', value: 45, color: 'bg-gray-400' },
    { label: 'On average', value: 370, color: 'bg-gray-300' },
  ];
  return (
    <div>
      {' '}
      <div className="bg-gray-900 text-white flex flex-col items-center justify-center pt-10">
        <div className="max-w-4xl w-full text-center space-y-6">
          <h2 className="text-xl font-medium">
            {t('serviceIntro.hero.subtitle')}
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold">
            {t('serviceIntro.hero.title.part1')}{' '}
            <span className="text-primary-1">
              {t('serviceIntro.hero.title.highlight')}
            </span>
            ,<br />
            {t('serviceIntro.hero.title.part2')}
          </h1>

          <div className="flex flex-col md:flex-row gap-4 mt-12">
            {[
              {
                icon: Shield,
                title: t('serviceIntro.hero.features.credibility.title'),
                subtitle: t('serviceIntro.hero.features.credibility.subtitle'),
                color: 'bg-primary-1',
              },
              {
                icon: Infinity,
                title: t('serviceIntro.hero.features.payback.title'),
                subtitle: t('serviceIntro.hero.features.payback.subtitle'),
                color: 'bg-primary-1',
              },
              {
                icon: Smile,
                title: t('serviceIntro.hero.features.simple.title'),
                subtitle: t('serviceIntro.hero.features.simple.subtitle'),
                color: 'bg-purple-600',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.color} mx-4 md:mx-0 rounded-2xl p-6 flex-1 flex flex-col items-center justify-center transition-transform hover:scale-105`}
              >
                <item.icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm opacity-80">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            {t('serviceIntro.sellingPoints.subtitle')}
          </p>

          <h2 className="text-4xl font-bold mb-6">
            {t('serviceIntro.sellingPoints.title')}
          </h2>

          <p className="text-gray-400 mb-12">
            {t('serviceIntro.sellingPoints.description')}
          </p>

          {/* Selling Point */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full p-6 mb-4">
                <HandIcon className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('serviceIntro.sellingPoints.points.first.title')}
              </h3>
              <p className="text-2xl font-bold">
                {t('serviceIntro.sellingPoints.points.first.description')}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full p-6 mb-4">
                <FileTextIcon className="w-12 h-12 text-primary-1" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('serviceIntro.sellingPoints.points.safety.title')}
              </h3>
              <p className="text-2xl font-bold">
                {t('serviceIntro.sellingPoints.points.safety.description')}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full p-6 mb-4">
                <UsersIcon className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('serviceIntro.sellingPoints.points.users.title')}
              </h3>
              <p className="text-2xl font-bold">
                {t('serviceIntro.sellingPoints.points.users.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="bg-primary-1 rounded-2xl p-4 inline-block mb-6">
            <Infinity className="w-12 h-12 text-white" />
          </div>
          <p className="text-xl leading-relaxed text-white">
            <span className="text-primary-1 font-semibold">
              {t('serviceIntro.officialPartner.text.highlight1')}
            </span>{' '}
            {t('serviceIntro.officialPartner.text.part1')}
            <br />
            <span className="text-primary-1 font-semibold">
              {t('serviceIntro.officialPartner.text.highlight2')}
            </span>{' '}
            {t('serviceIntro.officialPartner.text.part2')}
            <br />
            <span className="text-white">
              {t('serviceIntro.officialPartner.text.part3')}
            </span>
          </p>
        </div>
      </div>
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-400 mb-2">
            {t('serviceIntro.howToEnjoy.subtitle')}
          </p>
          <h2 className="text-4xl font-bold text-center mb-12">
            {t('serviceIntro.howToEnjoy.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-800 p-8 relative h-[600px] flex items-center justify-center rounded-xl overflow-hidden">
              <div className="relative w-[300px] h-[600px]">
                <Image
                  src={steps[activeStep]?.imgUrl || '/placeholder.svg'}
                  alt="Mobile phone mockup"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="mx-auto"
                />
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${
                    index === activeStep ? 'bg-primary-1' : 'bg-gray-800'
                  } cursor-pointer`}
                  onClick={() => setActiveStep(index)}
                >
                  <p
                    className={`font-semibold ${
                      index === activeStep ? 'text-black' : 'text-white'
                    }`}
                  >
                    {index + 1}. {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center">
            {t('serviceIntro.cashbackRange.title')}
          </h1>

          <div className="space-y-4 text-lg">
            <p>{t('serviceIntro.cashbackRange.conditions.minimum')}</p>
            <p>{t('serviceIntro.cashbackRange.conditions.maximum')}</p>
          </div>

          <div className="space-y-4">
            {barData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-right">{item.label}</div>
                <div className="flex-1 h-8 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: `${(item.value / 3488) * 100}%` }}
                  ></div>
                </div>
                <div className="w-20">{item.value} USDT</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-sm text-gray-400">
            <p>{t('serviceIntro.cashbackRange.note.part1')}</p>
            <p>{t('serviceIntro.cashbackRange.note.part2')}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-400 mb-2">
            {t('serviceIntro.callToAction.subtitle')}
          </p>
          <h1 className="text-4xl font-bold text-center mb-12">
            {t('serviceIntro.callToAction.title')}
          </h1>

          <Card className="bg-gray-800 p-8 mb-8">
            <p className="text-center mb-2">
              {t('serviceIntro.callToAction.bitget.question')}
            </p>
            <p className="text-center text-2xl mb-4">
              {t('serviceIntro.callToAction.bitget.savings')}
            </p>
            <p className="text-center text-sm text-gray-400">
              {t('serviceIntro.callToAction.bitget.note')}
            </p>
          </Card>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {t('serviceIntro.callToAction.howTo.title')}
            </h2>
            <p className="text-xl">
              {t('serviceIntro.callToAction.howTo.subtitle')}
            </p>
          </div>

          <LocaleLink href="/registExchange">
            <Button className="w-full bg-primary-1 hover:bg-primary-2 hover:text-primary-1 text-white">
              {t('serviceIntro.callToAction.howTo.button')}
            </Button>
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
