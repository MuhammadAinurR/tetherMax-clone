'use client';

import LocaleLink from '@/components/LocaleLink';
import { siteConfig } from '@/config/metadata';

export const DesktopMenu = ({ currentMenuItems, isActive }) => {
  return (
    <>
      <LocaleLink href="/">
        <p className="text-primary-1 text-2xl">{siteConfig.name}</p>
      </LocaleLink>

      <div className="gap-6 items-center hidden md:flex">
        {currentMenuItems.map((menu, idx) => (
          <LocaleLink key={idx} href={menu.path}>
            <p className={isActive(menu.path) ? 'text-primary-1' : 'hover:text-primary-1 hover:scale-105'}>
              {menu.name}
            </p>
          </LocaleLink>
        ))}
      </div>
    </>
  );
};
