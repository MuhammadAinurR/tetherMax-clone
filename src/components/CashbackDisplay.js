'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export function CashbackDisplay() {
  const [totalCashback, setTotalCashback] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    const fetchCashbackTotal = async () => {
      if (!user) return;

      try {
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
        console.error('Error fetching cashback total:', error);
        setTotalCashback(0);
      }
    };

    fetchCashbackTotal();
  }, [user]);

  return (
    <p className="text-4xl font-bold">{totalCashback.toLocaleString()} USDT</p>
  );
}
