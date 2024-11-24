'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function useLanguageSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLanguage = (newLocale) => {
    // Update path
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return { switchLanguage, currentLocale };
}
