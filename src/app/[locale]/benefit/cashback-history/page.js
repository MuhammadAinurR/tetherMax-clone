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
} from '@/components/ui/dialog';
import { DollarSign } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { showToast } from '@/utils/toastify';
import { GlobalWalletWithdrawDialog } from '@/components/GlobalWalletWithdrawDialog';

export default function CashbackHistory() {
  const { user } = useUser();
  const t = useTranslations('cashback');
  const [platformCashbacks, setPlatformCashbacks] = useState([]);
  const [cashbackHistory, setCashbackHistory] = useState([]);
  const [totalCashback, setTotalCashback] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Combine both fetch functions
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Cashback History</h1>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="px-8">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Linked Exchanges
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                  <DialogTitle>Linked Exchanges</DialogTitle>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exchange</TableHead>
                      <TableHead className="text-right">
                        Cashback (USDT)
                      </TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(platformCashbacks) &&
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
                              {cashback.balance < 10
                                ? t('minRequired')
                                : t('withdrawToMain')}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4">
                          No linked exchanges found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
            <GlobalWalletWithdrawDialog
              onWithdraw={handleCryptoWithdraw}
              globalBalance={totalCashback}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  Withdrawal History
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                  <DialogTitle>Withdrawal History</DialogTitle>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Network</TableHead>
                      <TableHead>Transaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cashbackHistory
                      .filter((item) => item.type === 'WITHDRAW')
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {item.crypto
                              ? `${item.crypto} Withdrawal`
                              : 'Platform Withdrawal'}
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
                              {item.status}
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
                                View
                              </a>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
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
                  Total Available Cashback
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
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount (USDT)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cashbackHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {item.platform?.name || 'Crypto Withdrawal'}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        item.type === 'EARN' ? 'text-green-600' : 'text-red-600'
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
                        {item.status}
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
                          View
                        </a>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
