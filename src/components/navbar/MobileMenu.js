'use client';

import Image from 'next/image';
import { forwardRef, useEffect, useState } from 'react';
import LocaleLink from '@/components/LocaleLink';
import { LANGUAGES } from '@/constants/navigation';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';

export const MobileMenu = forwardRef(
  (
    {
      isOpen,
      onClose,
      user,
      currentLocale,
      onLanguageChange,
      isActive,
      t,
      tAuth,
      menuItems,
    },
    ref
  ) => {
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

    const { signOut } = useClerk();

    const getMobileMenuItems = (user) => {
      const baseItems = [
        {
          name: t('home'),
          path: '/',
          icon: 'https://tethermax.io/static/images/sideMenu/home.png',
        },
      ];

      return [
        ...baseItems,
        ...(user ? menuItems.authenticated : menuItems.unauthenticated),
      ];
    };

    return (
      <div
        ref={ref}
        className={`md:hidden fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white shadow-lg z-50 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="p-4 border-b flex justify-between items-center">
            {user && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-2 flex items-center justify-center">
                  {user.firstName?.[0] ||
                    user.emailAddresses[0].emailAddress[0]}
                </div>
                <span className="font-medium truncate">
                  {user.firstName || user.emailAddresses[0].emailAddress}
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="hover:text-primary-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {getMobileMenuItems(user).map((item, index) => (
                <LocaleLink
                  key={index}
                  href={item.path}
                  className={`block p-3 hover:bg-gray-100 rounded-lg transition-colors ${
                    isActive(item.path) ? 'bg-primary-2 text-primary-1' : ''
                  }`}
                  onClick={onClose}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt=""
                        className="w-5 h-5 object-contain"
                        width={24}
                        height={24}
                      />
                    )}
                    <span className="text-base">{item.name}</span>
                  </div>
                </LocaleLink>
              ))}

              {/* Add Cashback Section for authenticated users */}
              {user && (
                <>
                  <div className="my-2 border-t"></div>
                  <div className="p-1 bg-white/90 rounded-lg">
                    <div className="font-medium">
                      Cashback: {totalCashback.toLocaleString()} USDT
                    </div>
                    <div className="flex flex-col">
                      <LocaleLink
                        href="/benefit/invitation-code"
                        onClick={onClose}
                      >
                        <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors text-xs">
                          {t('referralCode')}
                        </button>
                      </LocaleLink>
                      <LocaleLink
                        href="/benefit/cashback-history"
                        onClick={onClose}
                      >
                        <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors text-xs">
                          {t('myCashback')}
                        </button>
                      </LocaleLink>
                    </div>
                  </div>
                </>
              )}

              {/* Auth Buttons */}
              {!user && (
                <div className="space-y-2 mt-4">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="w-full p-3 bg-primary-2 text-primary-1 rounded-lg hover:bg-primary-2/90 transition-colors">
                        {tAuth('login')}
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <SignUpButton mode="modal">
                      <button className="w-full p-3 border border-primary-1 text-primary-1 rounded-lg hover:bg-primary-2/10 transition-colors">
                        {tAuth('signup')}
                      </button>
                    </SignUpButton>
                  </SignedIn>
                </div>
              )}

              {/* Logout Button */}
              {user && (
                <>
                  <div className="my-2 border-t"></div>
                  <button
                    onClick={async () => {
                      await signOut();
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-gray-100 rounded-lg transition-colors text-start"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    {tAuth('logout')}
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Language Switcher */}
          <div className="p-4 border-t">
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`flex items-center justify-center gap-2 p-2 rounded-lg transition-colors ${
                    currentLocale === lang.code
                      ? 'bg-primary-2 text-primary-1'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MobileMenu.displayName = 'MobileMenu';
