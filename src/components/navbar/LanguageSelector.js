'use client';

import { LANGUAGES } from '@/constants/navigation';
import { useLanguageSwitch } from '@/hooks/useLanguageSwitch';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import LocaleLink from '../LocaleLink';
import { useEffect, useState } from 'react';

export const LanguageSelector = ({ tAuth, isOpen, onOpenChange, t }) => {
  const { user } = useUser();
  const { switchLanguage, currentLocale } = useLanguageSwitch();
  const [totalCashback, setTotalCashback] = useState(0);

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
      }
    };

    fetchCashbackTotal();
  }, [user]);

  const handleLanguageChange = (langCode) => {
    switchLanguage(langCode);
    onOpenChange(false);
  };

  return (
    <div className="flex items-center gap-2 fixed right-6 top-3">
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <button className="hidden md:flex items-center px-2 py-2 bg-white/90 hover:bg-white text-gray-700 rounded-xl uppercase transition-colors">
            {currentLocale}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white overflow-hidden">
          <DialogTitle className="text-xl font-bold mb-4">
            {t('selectLanguage')}
          </DialogTitle>
          <div className="grid grid-cols-1 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => handleLanguageChange(lang.code)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </div>
                {currentLocale === lang.code && (
                  <span className="text-primary-1">✓</span>
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {user && (
        <div className="relative group hidden md:block">
          <button className="flex items-center gap-2 px-2 py-2 rounded-xl bg-white/90 hover:bg-white transition-colors">
            <span className="font-medium">
              {totalCashback.toLocaleString()} USDT
            </span>
            <svg
              className="w-4 h-4 transition-transform group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="py-2">
              <LocaleLink href="/benefit/invitation-code">
                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  {t('referralCode')}
                </button>
              </LocaleLink>
              <LocaleLink href="/benefit/cashback-history">
                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  {t('myCashback')}
                </button>
              </LocaleLink>
            </div>
          </div>
        </div>
      )}

      {user ? (
        <div className="hidden md:block">
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <div className="hidden md:block">
          <SignInButton mode="modal">
            <button className="px-5 py-2 bg-primary-2 text-primary-1 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              {tAuth('login')}
            </button>
          </SignInButton>
        </div>
      )}
    </div>
  );
};
