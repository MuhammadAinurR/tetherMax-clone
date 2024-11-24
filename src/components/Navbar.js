'use client';

import { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useUser } from '@clerk/nextjs';
import { getMenuItems } from '@/constants/navigation';
import { MobileMenu } from './navbar/MobileMenu';
import { DesktopMenu } from './navbar/DesktopMenu';
import { LanguageSelector } from './navbar/LanguageSelector';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useLanguageSwitch } from '@/hooks/useLanguageSwitch';

export default function Navbar() {
  const t = useTranslations('common');
  const tAuth = useTranslations('auth');
  const { user } = useUser();
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const { switchLanguage, currentLocale } = useLanguageSwitch();

  // Use custom hook for click outside
  useClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false));

  const isActive = (path) => {
    const currentPath = pathname.replace(/^\/[a-z]{2}/, '');
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const handleLanguageChange = (langCode) => {
    switchLanguage(langCode);
    setIsDialogOpen(false);
    setIsMobileMenuOpen(false);
  };

  const menuItems = getMenuItems(t);
  const currentMenuItems = user
    ? menuItems.authenticated
    : menuItems.unauthenticated;
  return (
    <header className="fixed top-0 left-0 right-0 flex px-5 md:justify-center items-center w-full h-[52px] md:h-16 bg-white text-gray-500 z-50 font-bold border">
      <div className="flex gap-6 items-center justify-center w-full max-w-7xl mx-auto">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden fixed left-3 top-[8px] p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-200 ${
              isMobileMenuOpen ? 'rotate-90' : ''
            }`}
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        <MobileMenu
          ref={mobileMenuRef}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          user={user}
          currentLocale={currentLocale}
          onLanguageChange={handleLanguageChange}
          isActive={isActive}
          t={t}
          tAuth={tAuth}
          menuItems={menuItems}
        />

        {/* Desktop Menu */}
        <DesktopMenu currentMenuItems={currentMenuItems} isActive={isActive} />

        {/* Language Selector */}
        <LanguageSelector
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          currentLocale={currentLocale}
          onLanguageChange={handleLanguageChange}
          t={t}
          user={user}
          tAuth={tAuth}
        />
      </div>
    </header>
  );
}
