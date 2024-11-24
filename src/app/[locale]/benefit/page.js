import Image from 'next/image';
import { Bell, Calculator, DollarSign, Gift, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import LocaleLink from '@/components/LocaleLink';
import { CashbackDisplay } from '@/components/CashbackDisplay';

export default function BenefitsPage() {
  const t = useTranslations('benefits');

  const missions = [
    {
      icon: <Gift className="h-6 w-6 text-red-500" />,
      title: t('missions.firstVisit.title'),
      description: t('missions.firstVisit.description'),
      isNew: true,
      link: '/',
    },
    {
      icon: <Bell className="h-6 w-6 text-yellow-500" />,
      title: t('missions.alarm.title'),
      description: t('missions.alarm.description'),
      isNew: true,
      link: '/benefit/notification',
    },
    {
      icon: <Calculator className="h-6 w-6 text-primary-1" />,
      title: t('missions.calculate.title'),
      description: t('missions.calculate.description'),
      isNew: true,
      link: '/benefit/payback-test',
    },
    {
      icon: (
        <Image
          src="https://tethermax.io/static/images/sideMenu/home.png"
          alt="degenMax"
          width={24}
          height={24}
        />
      ),
      title: t('missions.bindUid.title'),
      description: t('missions.bindUid.description'),
      isNew: true,
      link: '/benefit/uid',
    },
    {
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      title: t('missions.firstClaim.title'),
      description: t('missions.firstClaim.description'),
      isNew: true,
      link: '/benefit/payback',
    },
    {
      icon: <Gift className="h-6 w-6 text-purple-500" />,
      title: t('missions.events.title'),
      description: t('missions.events.description'),
      isNew: true,
      link: '/benefit/events',
    },
    {
      icon: (
        <Image
          src="https://tethermax.io/static/images/sideMenu/exchange.png"
          alt="Cashback"
          width={24}
          height={24}
        />
      ),
      title: t('missions.monthlyClaim.title'),
      description: t('missions.monthlyClaim.description'),
      isNew: true,
      link: '/benefit/exchanges',
    },
    {
      icon: <Users className="h-6 w-6 text-primary-1" />,
      title: t('missions.invite.title'),
      description: t('missions.invite.description'),
      isNew: true,
      link: '/benefit/invitation-code',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <LocaleLink href="/benefit/cashback-history">
          <div className="bg-primary-1 text-white p-8 mb-8 rounded-2xl">
            <h1 className="text-2xl font-semibold mb-3">{t('title')}</h1>
            <p className="text-3xl font-bold mb-6">{t('subtitle')}</p>

            <Card className="bg-white text-black p-6">
              <CardContent className="flex justify-between items-center p-0">
                <div className="space-y-2">
                  <p className="text-gray-600 text-lg">{t('received.title')}</p>
                  <CashbackDisplay />
                  <p className="text-gray-600 text-lg">
                    {t('received.subtitle')}
                  </p>
                </div>
                <DollarSign className="h-32 w-32 text-gray-200" />
              </CardContent>
            </Card>
          </div>
        </LocaleLink>

        <div className="flex items-center space-x-3 mb-8">
          <DollarSign className="h-6 w-6 text-yellow-500" />
          <p className="text-lg">{t('earnMore', { amount: '166' })}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((item, index) => (
            <LocaleLink key={index} href={item.link || '#'}>
              <Card className="h-full p-0 hover:shadow-lg transition-shadow">
                <CardContent className="flex items-center justify-between p-6 h-full">
                  <div className="flex items-center space-x-5 flex-1">
                    <div className="bg-gray-100 p-3 rounded-full flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-h-[3rem] flex flex-col justify-center">
                      <p className="text-primary-1 text-lg mb-1">
                        {item.title}
                      </p>
                      <p className="text-gray-600 text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {item.isNew && (
                      <span className="bg-red-100 text-red-600 text-sm px-3 py-1.5 rounded-full">
                        {t('new')}
                      </span>
                    )}
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <span className="sr-only">{t('details')}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </LocaleLink>
          ))}
        </div>
      </main>
    </div>
  );
}
