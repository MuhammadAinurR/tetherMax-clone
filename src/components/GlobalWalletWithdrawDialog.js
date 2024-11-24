'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DollarSign } from 'lucide-react';
import { useTranslations } from 'use-intl';

const CRYPTO_OPTIONS = [
  { value: 'ETH', label: 'Ethereum (ERC20)', rate: 0.000431, network: 'ETH' },
  { value: 'BNB', label: 'BNB (BEP20)', rate: 0.00324, network: 'BSC' },
  { value: 'MATIC', label: 'Polygon (MATIC)', rate: 0.89, network: 'POLYGON' },
];

const NETWORKS = {
  ETH: 'https://etherscan.io/tx/',
  BSC: 'https://bscscan.com/tx/',
  POLYGON: 'https://polygonscan.com/tx/',
};

export function GlobalWalletWithdrawDialog({ onWithdraw, globalBalance }) {
  const t = useTranslations('cashbackHistory.withdrawDialog');
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0]);
  const [walletAddress, setWalletAddress] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (amount && selectedCrypto) {
      setConvertedAmount(Number(amount) * selectedCrypto.rate);
    }
  }, [amount, selectedCrypto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onWithdraw({
      amount: Number(amount),
      crypto: selectedCrypto.value,
      network: selectedCrypto.network,
      walletAddress,
      convertedAmount,
    });
    if (success) {
      setIsOpen(false);
      setAmount('');
      setWalletAddress('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <DollarSign className="h-4 w-4 mr-2" />
          {t('withdrawButton')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription> </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label>{t('availableBalance')}</label>
            <div className="text-lg font-semibold">
              {globalBalance.toFixed(2)} USDT
            </div>
          </div>

          <div className="space-y-2">
            <label>{t('amount')}</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={globalBalance}
              min="10"
              required
              placeholder={t('amountPlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <label>{t('selectNetwork')}</label>
            <Select
              value={selectedCrypto.value}
              onValueChange={(value) =>
                setSelectedCrypto(CRYPTO_OPTIONS.find((c) => c.value === value))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CRYPTO_OPTIONS.map((crypto) => (
                  <SelectItem key={crypto.value} value={crypto.value}>
                    {crypto.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {amount && (
            <div className="text-sm text-gray-500">
              {t('youWillReceive', {
                amount: convertedAmount.toFixed(8),
                crypto: selectedCrypto.value,
              })}
            </div>
          )}

          <div className="space-y-2">
            <label>
              {t('walletAddress', { crypto: selectedCrypto.value })}
            </label>
            <Input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
              placeholder={t('walletAddressPlaceholder', {
                crypto: selectedCrypto.value,
              })}
            />
          </div>

          <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded">
            {t('warningMessage', {
              crypto: selectedCrypto.value,
              network: selectedCrypto.network,
            })}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              !amount || !walletAddress || Number(amount) > globalBalance
            }
          >
            {t('confirmButton')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
