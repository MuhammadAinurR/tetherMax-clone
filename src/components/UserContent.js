'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfinityIcon, ChevronRight, ChartPie } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LocaleLink from './LocaleLink';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function UserContent({ exchangesTable }) {
  const { user } = useUser();
  const t = useTranslations('userContent');
  const [boundExchanges, setBoundExchanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [platformBalances, setPlatformBalances] = useState({});
  const [totalCashback, setTotalCashback] = useState(0);

  useEffect(() => {
    const fetchBoundExchanges = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`/api/binds?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          // Filter only bound exchanges
          setBoundExchanges(data.filter((bind) => bind.isBind) || []);
        }
      } catch (error) {
        console.error('Error fetching bound exchanges:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoundExchanges();
  }, [user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch platform cashbacks
        const cashbacksResponse = await fetch('/api/platform-cashbacks', {
          headers: {
            'x-user-id': user.id,
          },
        });
        const cashbacksData = await cashbacksResponse.json();
        const balances = cashbacksData.reduce(
          (acc, item) => ({
            ...acc,
            [item.platformId]: Number(item.balance),
          }),
          {}
        );
        setPlatformBalances(balances);

        // Fetch cashback history for total
        const historyResponse = await fetch('/api/cashback-history', {
          headers: {
            'x-user-id': user.id,
          },
        });
        const historyData = await historyResponse.json();

        if (Array.isArray(historyData)) {
          const total = historyData.reduce((sum, item) => {
            const amount = Number(item.amount);
            return item.type === 'EARN' ? sum + amount : sum - amount;
          }, 0);
          setTotalCashback(total);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  // Original Authenticated View (when no bind exists)
  const OriginalAuthenticatedView = () => (
    <div className="max-w-7xl mx-auto py-6 space-y-8">
      {/* Welcome Banner with User Info */}
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary-1/10 flex items-center justify-center">
            <span className="text-3xl">👋</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-primary-1 font-semibold">
              {t('welcome.greeting')}
            </p>
            <p className="text-xl font-bold text-gray-900">
              {t('welcome.intro')}
            </p>
          </div>
        </div>
        {/* Quick Stats */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {t('stats.totalPlatformLinked')}
            </p>
            <p className="text-2xl font-bold text-primary-1">0</p>
          </div>
        </div>
      </div>

      {/* Action Cards in a Better Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Register Exchange Card */}
        <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-br from-[#24D19E] to-[#04B58A] p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold text-white">
                  {t('userGuide.title')}
                </CardTitle>
                <p className="text-white/80 text-sm">
                  {t('registerExchange.subtitle')}
                </p>
              </div>
              <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 text-sm">✓</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {t('registerExchange.features.tracking')}
                </p>
              </div>
            </div>
            <LocaleLink href="/registExchange" className="block">
              <Button
                variant="default"
                className="w-full bg-[#04B58A] hover:bg-[#24D19E] transition-colors text-lg py-6 rounded-xl text-white"
              >
                {t('userGuide.button')}
                <span className="ml-2">→</span>
              </Button>
            </LocaleLink>
          </CardContent>
        </Card>

        {/* Bind UID Card */}
        <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-br from-[#0066FC] to-[#0058DB] p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold text-white">
                  {t('bindUid.title')}
                </CardTitle>
                <p className="text-white/80 text-sm">
                  {t('bindUidCard.subtitle')}
                </p>
              </div>
              <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-4xl">🔗</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm">✓</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {t('bindUid.description')}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm">✓</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {t('bindUidCard.features.sync')}
                </p>
              </div>
            </div>
            <LocaleLink href="/uidlinking" className="block">
              <Button
                variant="default"
                className="w-full bg-[#0066FC] hover:bg-[#0058DB] transition-colors text-lg py-6 rounded-xl text-white"
              >
                {t('bindUid.button')}
                <span className="ml-2">→</span>
              </Button>
            </LocaleLink>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary-1/10 rounded-lg">
              <InfinityIcon className="h-5 w-5 text-primary-1" />
            </div>
            <p className="font-medium text-gray-700">{t('quickActions.viewAnalytics')}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary-1/10 rounded-lg">
              <span className="text-xl">📈</span>
            </div>
            <p className="font-medium text-gray-700">{t('quickActions.trackProgress')}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary-1/10 rounded-lg">
              <span className="text-xl">⚡</span>
            </div>
            <p className="font-medium text-gray-700">{t('quickActions.quickSettings')}</p>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );

  // Bind Status View (when there are bound exchanges)
  const BindStatusView = () => (
    <div className="max-w-7xl mx-auto py-6 space-y-8">
      {/* Rewards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Rewards Card */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium mb-2">{t('rewards.title')}</h3>
              <p className="text-4xl font-bold">
                {totalCashback.toLocaleString()}{' '}
                <span className="text-2xl">USDT</span>
              </p>
            </div>
            <LocaleLink href="/benefit/cashback-history">
              <Button
                className="bg-blue-700 hover:bg-blue-800 text-white"
                size="sm"
              >
                {t('rewards.withdraw')}
              </Button>
            </LocaleLink>
          </div>

          <LocaleLink href="/benefit/payback-test">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white p-0 h-auto flex items-center gap-2"
            >
              <span className="flex items-center gap-2">
                <ChartPie className="h-5 w-5" />
                {t('rewards.analytics')}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </LocaleLink>
        </div>

        {/* Benefits Card */}
        <div className="bg-white rounded-2xl p-6 border border-blue-100">
          <div className="space-y-2">
            <p className="text-gray-600">{t('benefits.waiting')}</p>
            <p className="text-2xl font-bold text-blue-600">
              {t('benefits.maxDay')}
            </p>
            <LocaleLink href="/benefit">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-blue-600 p-0 h-auto flex items-center gap-2"
              >
                <span>{t('benefits.earnUsdt')}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </LocaleLink>
          </div>
        </div>
      </div>

      {/* My Exchange Section */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-bold">{t('myExchange.title')}</h2>
        </div>

        <div className="space-y-4">
          {boundExchanges.map((exchange, index) => {
            const exchangeDetails = exchangesTable.find(
              (e) => e.id === exchange.platformId
            );

            // Get balance for this platform
            const balance = platformBalances[exchange.platformId] || 0;

            return (
              <div
                key={`exchange-${exchange.id || index}`}
                className="flex items-center gap-4 p-4 border rounded-xl"
              >
                <div className="h-12 w-12 rounded-lg flex items-center justify-center overflow-hidden">
                  {exchangeDetails?.imageUrl ? (
                    <Image
                      src={exchangeDetails.imageUrl}
                      alt={exchangeDetails.name || 'Exchange icon'}
                      width={48}
                      height={48}
                      className="object-contain rounded-full"
                    />
                  ) : (
                    <ChartPie className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {exchangeDetails.name} | {exchange.uid}
                  </p>
                  <p className="font-medium">{balance.toLocaleString()} USDT</p>
                </div>
              </div>
            );
          })}

          <LocaleLink href="/uidlinking" className="block">
            <Button
              variant="default"
              className="border-2 shadow-md w-full flex items-center gap-2 justify-center rounded-xl py-4"
            >
              <span className="text-xl">➕</span> {t('myExchange.addExchange')}
            </Button>
          </LocaleLink>
        </div>
      </div>
    </div>
  );

  // Guest View
  const GuestView = () => (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="py-16 md:px-4 text-center bg-gradient-to-b from-white rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-1 to-blue-600 text-transparent bg-clip-text">
          {t('hero.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
      </div>

      {/* Exchange Rates Slider */}
      <div className="md:px-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {t('averageCashback.title')}
        </h2>
        <div className="relative">
          <div
            className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none pb-4"
            onMouseDown={(e) => {
              const ele = e.currentTarget;
              const startX = e.pageX - ele.offsetLeft;
              const scrollLeft = ele.scrollLeft;

              const handleMouseMove = (e) => {
                const x = e.pageX - ele.offsetLeft;
                const walk = x - startX;
                ele.scrollLeft = scrollLeft - walk;
              };

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
            {exchangesTable.map((exchange, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 bg-white border border-gray-200 hover:border-primary-1 rounded-xl px-6 py-4 flex items-center gap-4 transition-all shadow-sm hover:shadow-md"
              >
                <span className="font-medium text-gray-700">
                  {exchange.name}
                </span>
                <span className="text-primary-1 font-bold text-lg">
                  ${exchange.averageRebate}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator Card */}
      <div className="md:px-6 mb-12">
        <Card className="bg-gradient-to-br from-gray-50 to-white border-none">
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 gap-8">
            <div className="flex-shrink-0 rounded-xl overflow-hidden">
              <ChartPie className="h-12 w-12 text-primary-1" />
            </div>
            <div className="space-y-6 text-center md:text-left flex-1">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-gray-900">
                  {t('averageCashback.monthlyAverage')}
                </h3>
                <p className="text-xl text-gray-600">
                  {t('averageCashback.checkTime')}
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  size="lg"
                  className="bg-primary-1 hover:bg-primary-1/90 text-white text-lg px-5  py-3 h-auto rounded-xl"
                >
                  {t('averageCashback.calculateButton')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* App Promo */}
      <div className="md:px-6 mb-12">
        <Card className="hover:shadow-xl transition-all border-none bg-gradient-to-r from-white to-transparent">
          <CardContent className="flex items-center gap-6 p-8">
            <div className="p-4 bg-primary-1/10 rounded-full">
              <InfinityIcon className="h-12 w-12 text-primary-1" />
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">
                {t('appPromo.subtitle')}
              </p>
              <p className="text-primary-1 font-bold text-2xl">
                {t('appPromo.title')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  return (
    <div className="w-full bg-background-1">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
        {user ? (
          isLoading ? (
            <div>{t('loading')}</div>
          ) : boundExchanges.length > 0 ? (
            <BindStatusView />
          ) : (
            <OriginalAuthenticatedView />
          )
        ) : (
          <GuestView />
        )}
      </div>
    </div>
  );
}
