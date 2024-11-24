'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { DollarSign } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { showToast } from '@/utils/toastify';
import { GlobalWalletWithdrawDialog } from '@/components/GlobalWalletWithdrawDialog';

export default function CashbackHistory() {
  const { user } = useUser();
  const t = useTranslations('cashbackHistory');
  const [platformCashbacks, setPlatformCashbacks] = useState([]);
  const [cashbackHistory, setCashbackHistory] = useState([]);
  const [totalCashback, setTotalCashback] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Combine both fetch functions
  const fetchData = async () => {
    if (!user) return;
    setIsLoadingData(true);

    try {
      // Fetch platform cashbacks
      const cashbacksResponse = await fetch('/api/platform-cashbacks', {
        headers: {
          'x-user-id': user.id,
        },
      });
      const cashbacksData = await cashbacksResponse.json();
      setPlatformCashbacks(Array.isArray(cashbacksData) ? cashbacksData : []);

      // Fetch cashback history
      const historyResponse = await fetch('/api/cashback-history', {
        headers: {
          'x-user-id': user.id,
        },
      });
      const historyData = await historyResponse.json();

      if (Array.isArray(historyData)) {
        setCashbackHistory(historyData);
        const total = historyData.reduce((sum, item) => {
          const amount = Number(item.amount);
          return item.type === 'EARN' ? sum + amount : sum - amount;
        }, 0);
        setTotalCashback(total);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setPlatformCashbacks([]);
      setCashbackHistory([]);
      setTotalCashback(0);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handlePlatformWithdraw = async (platformId, amount) => {
    if (!user) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/platform-cashbacks/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({ platformId, amount }),
      });

      const data = await response.json();

      if (data.error) {
        showToast('error', data.error);
      } else {
        showToast('success', 'Successfully withdrawn to main wallet');
        // Refresh all data
        await fetchData();
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('error', 'Failed to withdraw. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCryptoWithdraw = async (withdrawData) => {
    if (!user) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/withdrawals/crypto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify(withdrawData),
      });

      const data = await response.json();

      if (data.error) {
        showToast('error', data.error);
        return false;
      } else {
        showToast('success', 'Withdrawal request submitted');
        fetchData();
        return true;
      }
    } catch (error) {
      showToast('error', 'Failed to submit withdrawal');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Dummy data for withdrawal history
  const withdrawalHistory = [
    { date: '2024-03-15', amount: 50000 },
    { date: '2024-03-10', amount: 30000 },
    { date: '2024-03-05', amount: 25000 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-0">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="px-8 md:rounded-l-xl"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  {t('platformBalance.linkedExchanges')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white w-[95vw] sm:w-auto max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {t('platformBalance.linkedExchanges')}
                  </DialogTitle>
                  <DialogDescription> </DialogDescription>
                </DialogHeader>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          {t('platformBalance.columns.platform')}
                        </TableHead>
                        <TableHead className="text-right">
                          {t('platformBalance.columns.balance')}
                        </TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingData ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-4">
                            {t('loading')}
                          </TableCell>
                        </TableRow>
                      ) : Array.isArray(platformCashbacks) &&
                        platformCashbacks.length > 0 ? (
                        platformCashbacks.map((cashback) => (
                          <TableRow key={cashback.platformId}>
                            <TableCell>{cashback.platform.name}</TableCell>
                            <TableCell className="text-right">
                              {Number(cashback.balance).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={cashback.balance < 10 || isLoading}
                                onClick={() =>
                                  handlePlatformWithdraw(
                                    cashback.platformId,
                                    cashback.balance
                                  )
                                }
                              >
                                {t('platformBalance.withdraw')}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-4">
                            {t('platformBalance.noLinkedExchanges')}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </DialogContent>
            </Dialog>
            <GlobalWalletWithdrawDialog
              onWithdraw={handleCryptoWithdraw}
              globalBalance={totalCashback}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="px-8 md:rounded-r-xl"
                >
                  {t('history.title')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                  <DialogTitle>{t('history.title')}</DialogTitle>
                  <DialogDescription> </DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('history.columns.date')}</TableHead>
                      <TableHead>{t('history.columns.type')}</TableHead>
                      <TableHead className="text-right">
                        {t('history.columns.amount')}
                      </TableHead>
                      <TableHead>{t('history.columns.status')}</TableHead>
                      <TableHead>{t('history.columns.network')}</TableHead>
                      <TableHead>{t('history.columns.transaction')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingData ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          {t('loading')}
                        </TableCell>
                      </TableRow>
                    ) : cashbackHistory.filter(
                        (item) => item.type === 'WITHDRAW'
                      ).length > 0 ? (
                      cashbackHistory
                        .filter((item) => item.type === 'WITHDRAW')
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              {new Date(item.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {item.crypto
                                ? t('history.types.cryptoWithdraw', {
                                    crypto: item.crypto,
                                  })
                                : t('history.types.withdraw')}
                            </TableCell>
                            <TableCell className="text-right">
                              {Number(item.amount).toLocaleString()} USDT
                              {item.convertedAmount && (
                                <div className="text-xs text-gray-500">
                                  ≈ {Number(item.convertedAmount).toFixed(8)}{' '}
                                  {item.crypto}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  item.status === 'SUCCESS'
                                    ? 'bg-green-100 text-green-800'
                                    : item.status === 'FAILED'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {t(
                                  `history.status.${item.status.toLowerCase()}`
                                )}
                              </span>
                            </TableCell>
                            <TableCell>{item.network || '-'}</TableCell>
                            <TableCell>
                              {item.hashLink ? (
                                <a
                                  href={
                                    item.hashLink.startsWith('@')
                                      ? item.hashLink.slice(1)
                                      : item.hashLink
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  {t('history.viewTransaction')}
                                </a>
                              ) : (
                                '-'
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          {t('history.noWithdrawals')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardContent className="p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm mb-1">
                  {t('totalAvailable')}
                </p>
                <p className="text-2xl font-bold">
                  {totalCashback.toLocaleString()} USDT
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('history.columns.date')}</TableHead>
                  <TableHead>{t('history.columns.type')}</TableHead>
                  <TableHead className="text-right">
                    {t('history.columns.amount')}
                  </TableHead>
                  <TableHead>{t('history.columns.status')}</TableHead>
                  <TableHead>{t('history.columns.transaction')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingData ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      {t('loading')}
                    </TableCell>
                  </TableRow>
                ) : cashbackHistory.length > 0 ? (
                  cashbackHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {item.platform?.name ||
                          t('history.types.cryptoWithdraw', {
                            crypto: item.crypto || 'USDT', // Provide a default value if item.crypto is undefined
                          })}
                      </TableCell>
                      <TableCell
                        className={`text-right ${
                          item.type === 'EARN'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {item.type === 'EARN' ? '+' : '-'}
                        {Number(item.amount).toLocaleString()}
                        {item.convertedAmount && (
                          <div className="text-xs text-gray-500">
                            ≈ {Number(item.convertedAmount).toFixed(8)}{' '}
                            {item.crypto}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'SUCCESS'
                              ? 'bg-green-100 text-green-800'
                              : item.status === 'FAILED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {t(`history.status.${item.status.toLowerCase()}`)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {item.hashLink ? (
                          <a
                            href={
                              item.hashLink.startsWith('@')
                                ? item.hashLink.slice(1)
                                : item.hashLink
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {t('history.viewTransaction')}
                          </a>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      {t('history.noTransactions')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
