'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function LocaleLink({ href, children, ...props }) {
  const locale = useLocale();
  const localizedHref = href.startsWith('/') ? `/${locale}${href}` : href;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
